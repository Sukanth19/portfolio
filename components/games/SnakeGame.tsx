'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Position {
  x: number
  y: number
}

interface GameStats {
  score: number
  highScore: number
  gameOver: boolean
  won: boolean
}

const GRID_SIZE = 20
const CELL_SIZE = 16
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Position = { x: 1, y: 0 }
const GAME_SPEED = 100
const WIN_LENGTH = 50

export function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    gameOver: false,
    won: false,
  })
  const [isPaused, setIsPaused] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const directionQueueRef = useRef<Position[]>([])

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (
      currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    )
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood(INITIAL_SNAKE))
    setStats(prev => ({
      score: 0,
      highScore: prev.highScore,
      gameOver: false,
      won: false,
    }))
    setIsPaused(false)
    directionQueueRef.current = []
  }, [generateFood])

  const gameLoop = useCallback(() => {
    setSnake(prevSnake => {
      if (stats.gameOver || stats.won || isPaused) return prevSnake

      // Process direction queue
      const nextDirection = directionQueueRef.current.shift() || direction
      
      const head = prevSnake[0]
      const newHead = {
        x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setStats(prev => {
          const newHighScore = Math.max(prev.score, prev.highScore)
          localStorage.setItem('snakeHighScore', newHighScore.toString())
          return { ...prev, gameOver: true, highScore: newHighScore }
        })
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = stats.score + 10
        
        // Check win condition
        if (newSnake.length >= WIN_LENGTH) {
          setStats(prev => {
            const newHighScore = Math.max(newScore, prev.highScore)
            localStorage.setItem('snakeHighScore', newHighScore.toString())
            return { 
              ...prev, 
              score: newScore, 
              won: true,
              highScore: newHighScore 
            }
          })
          return newSnake
        }

        setStats(prev => ({ ...prev, score: newScore }))
        setFood(generateFood(newSnake))
        return newSnake
      } else {
        newSnake.pop()
        return newSnake
      }
    })
  }, [direction, food, stats.gameOver, stats.won, stats.score, isPaused, generateFood])

  useEffect(() => {
    gameLoopRef.current = setInterval(gameLoop, GAME_SPEED)
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameLoop])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (stats.gameOver || stats.won) {
        if (e.key === 'r' || e.key === 'R') {
          resetGame()
        }
        return
      }

      if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(prev => !prev)
        return
      }

      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Queue direction changes to prevent rapid direction reversals
      const currentDirection = directionQueueRef.current[directionQueueRef.current.length - 1] || direction
      let newDirection: Position | null = null

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDirection.y !== 1) newDirection = { x: 0, y: -1 }
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDirection.y !== -1) newDirection = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDirection.x !== 1) newDirection = { x: -1, y: 0 }
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDirection.x !== -1) newDirection = { x: 1, y: 0 }
          break
      }

      if (newDirection) {
        e.preventDefault()
        setDirection(newDirection)
        if (directionQueueRef.current.length < 3) {
          directionQueueRef.current.push(newDirection)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, stats.gameOver, stats.won, resetGame, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-void-light border-2 border-lavender/40 rounded-lg p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-lavender font-mono mb-1">
              SNAKE.EXE
            </h2>
            <p className="text-xs text-gray-muted font-mono">
              WASD or Arrow Keys • Space to Pause • ESC to Exit
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-crimson hover:text-crimson/80 transition-colors interactive text-2xl"
          >
            ×
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-gray-muted/30 p-3 bg-void/50">
            <div className="text-xs text-gray-muted font-mono mb-1">SCORE</div>
            <div className="text-2xl font-bold text-lavender font-mono">{stats.score}</div>
          </div>
          <div className="border border-gray-muted/30 p-3 bg-void/50">
            <div className="text-xs text-gray-muted font-mono mb-1">HIGH SCORE</div>
            <div className="text-2xl font-bold text-crimson font-mono">{stats.highScore}</div>
          </div>
          <div className="border border-gray-muted/30 p-3 bg-void/50">
            <div className="text-xs text-gray-muted font-mono mb-1">LENGTH</div>
            <div className="text-2xl font-bold text-text-light font-mono">{snake.length}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative mb-6 flex justify-center">
          <div
            className="border-2 border-lavender/40 bg-void/80 relative"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={`${segment.x}-${segment.y}-${index}`}
                className={`absolute ${
                  index === 0 ? 'bg-lavender' : 'bg-lavender/70'
                }`}
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE - 1,
                  height: CELL_SIZE - 1,
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  boxShadow: index === 0 ? '0 0 10px rgba(184, 174, 216, 0.8)' : 'none'
                }}
                transition={{ duration: 0.1 }}
              >
                {index === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-[8px]">
                    {direction.x === 1 && '▶'}
                    {direction.x === -1 && '◀'}
                    {direction.y === 1 && '▼'}
                    {direction.y === -1 && '▲'}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Food */}
            <motion.div
              className="absolute bg-crimson"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
              }}
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 5px rgba(155, 27, 48, 0.5)',
                  '0 0 15px rgba(155, 27, 48, 1)',
                  '0 0 5px rgba(155, 27, 48, 0.5)',
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />

            {/* Pause Overlay */}
            <AnimatePresence>
              {isPaused && !stats.gameOver && !stats.won && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-lavender font-mono mb-2">
                      PAUSED
                    </div>
                    <div className="text-sm text-gray-muted font-mono">
                      Press SPACE to resume
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Over Overlay */}
            <AnimatePresence>
              {stats.gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold text-crimson font-mono mb-2"
                    >
                      GAME OVER
                    </motion.div>
                    <div className="text-lg text-text-light font-mono mb-1">
                      Score: {stats.score}
                    </div>
                    <div className="text-sm text-gray-muted font-mono mb-4">
                      Press R to restart
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Win Overlay */}
            <AnimatePresence>
              {stats.won && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-4xl font-bold text-lavender font-mono mb-2"
                    >
                      YOU WIN!
                    </motion.div>
                    <div className="text-lg text-text-light font-mono mb-1">
                      Perfect Score: {stats.score}
                    </div>
                    <div className="text-sm text-gray-muted font-mono mb-4">
                      Press R to play again
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls hint */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="border border-gray-muted/20 p-3 bg-void/30">
            <div className="text-crimson mb-2">CONTROLS</div>
            <div className="text-gray-muted space-y-1">
              <div>↑ W - Move Up</div>
              <div>↓ S - Move Down</div>
              <div>← A - Move Left</div>
              <div>→ D - Move Right</div>
            </div>
          </div>
          <div className="border border-gray-muted/20 p-3 bg-void/30">
            <div className="text-crimson mb-2">OBJECTIVE</div>
            <div className="text-gray-muted space-y-1">
              <div>• Eat the food (red)</div>
              <div>• Grow to length {WIN_LENGTH}</div>
              <div>• Don&apos;t hit yourself</div>
              <div>• Reach max length to win!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
