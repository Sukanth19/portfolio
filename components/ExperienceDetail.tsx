'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Experience } from '@/data/experience'

interface ExperienceDetailProps {
  experience: Experience
  onClose: () => void
}

export function ExperienceDetail({ experience, onClose }: ExperienceDetailProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="min-h-screen py-24 px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 0.1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onClose}
              className="mb-8 text-sm font-mono text-gray-muted hover:text-text-light transition-colors flex items-center gap-2 interactive"
            >
              <span>←</span>
              <span>BACK TO EXPERIENCE</span>
            </button>

            <div className="bg-void-light border border-gray-muted/30 p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono px-2 py-1 border border-lavender/40 text-lavender">
                    [{experience.type.toUpperCase()}]
                  </span>
                  <span className="text-xs font-mono text-crimson">
                    2026
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-2">
                  {experience.startDate} → {experience.endDate}
                </h1>
                <p className="text-sm font-mono text-gray-muted">
                  {experience.duration}
                </p>
              </div>

              {/* Role */}
              <section className="mb-8">
                <h2 className="text-sm font-mono text-crimson mb-3">ROLE</h2>
                <p className="text-lg text-lavender">{experience.role}</p>
              </section>

              {/* Environment */}
              <section className="mb-8">
                <h2 className="text-sm font-mono text-crimson mb-3">ENVIRONMENT</h2>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-mono text-text-light border border-lavender/20 px-3 py-1 bg-purple-deep/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Work */}
              <section className="mb-8">
                <h2 className="text-sm font-mono text-crimson mb-3">WORK</h2>
                <ul className="space-y-2">
                  {experience.work.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">├──</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Systems */}
              <section className="mb-8">
                <h2 className="text-sm font-mono text-crimson mb-3">SYSTEMS</h2>
                <ul className="space-y-2">
                  {experience.systems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture Diagram */}
              <section className="mb-8 p-6 border border-purple-deep/30 bg-void/50">
                <h2 className="text-sm font-mono text-crimson mb-4">ARCHITECTURE</h2>
                
                <div className="font-mono text-sm space-y-3">
                  {/* Web Stack */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lavender">CLIENT</span>
                      <span className="text-gray-muted">→</span>
                      <span className="text-gray-muted">[Browser]</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pl-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-crimson">↓</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lavender">NGINX</span>
                      <span className="text-gray-muted">→</span>
                      <span className="text-gray-muted">[Web Server]</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pl-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-crimson">↓</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lavender">LARAVEL / PHP</span>
                      <span className="text-gray-muted">→</span>
                      <span className="text-gray-muted">[Backend]</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pl-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-crimson">↓</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lavender">DATABASE</span>
                      <span className="text-gray-muted">→</span>
                      <span className="text-gray-muted">[Data Layer]</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pl-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-crimson">↓</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lavender">AWS / EC2</span>
                      <span className="text-gray-muted">→</span>
                      <span className="text-gray-muted">[Cloud Infrastructure]</span>
                    </div>
                  </motion.div>

                  {/* AI Subsystem */}
                  {experience.ai && (
                    <>
                      <div className="my-4 border-t border-gray-muted/20" />
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <div className="text-crimson text-xs mb-2">AI SUBSYSTEM</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lavender">{experience.ai.language}</span>
                          <span className="text-gray-muted">→</span>
                          <span className="text-gray-muted">[Runtime]</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="pl-8"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-crimson">↓</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lavender">AI CHATBOT</span>
                          <span className="text-gray-muted">→</span>
                          <span className="text-gray-muted">[Application]</span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </section>

              {/* AI Chatbot */}
              {experience.ai && (
                <section className="mb-8 p-6 border border-purple-deep/30 bg-purple-deep/10">
                  <h2 className="text-sm font-mono text-crimson mb-4">AI CHATBOT</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-mono text-lavender mb-1">Language</div>
                      <div className="text-text-light">{experience.ai.language}</div>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-lavender mb-1">Description</div>
                      <div className="text-gray-muted">{experience.ai.description}</div>
                    </div>

                    {experience.ai.purpose && experience.ai.purpose !== '[To Be Updated]' && (
                      <div>
                        <div className="text-xs font-mono text-lavender mb-1">Purpose</div>
                        <div className="text-gray-muted">{experience.ai.purpose}</div>
                      </div>
                    )}

                    {experience.ai.architecture && experience.ai.architecture !== '[To Be Updated]' && (
                      <div>
                        <div className="text-xs font-mono text-lavender mb-1">Architecture</div>
                        <div className="text-gray-muted">{experience.ai.architecture}</div>
                      </div>
                    )}

                    {experience.ai.components && experience.ai.components[0] !== '[To Be Updated]' && (
                      <div>
                        <div className="text-xs font-mono text-lavender mb-2">Components</div>
                        <ul className="space-y-1">
                          {experience.ai.components.map((comp, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-muted">
                              <span className="text-lavender">•</span>
                              <span>{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {experience.ai.deployment && experience.ai.deployment !== '[To Be Updated]' && (
                      <div>
                        <div className="text-xs font-mono text-lavender mb-1">Deployment</div>
                        <div className="text-gray-muted">{experience.ai.deployment}</div>
                      </div>
                    )}

                    {experience.ai.contribution && experience.ai.contribution !== '[To Be Updated]' && (
                      <div>
                        <div className="text-xs font-mono text-lavender mb-1">Contribution</div>
                        <div className="text-gray-muted">{experience.ai.contribution}</div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Learning */}
              <section>
                <h2 className="text-sm font-mono text-crimson mb-3">LEARNING</h2>
                <ul className="space-y-2">
                  {experience.learning.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
