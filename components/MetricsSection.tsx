'use client'

import { motion } from 'framer-motion'
import { GitHubActivityGraph } from './GitHubActivityGraph'
import { CodeMetricsDashboard } from './CodeMetricsDashboard'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function MetricsSection() {
  return (
    <section id="metrics" className="min-h-screen py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-px bg-crimson"
                whileHover={{ width: 60 }}
                transition={{ duration: 0.2 }}
              />
              <motion.h2 
                className="text-sm font-mono text-crimson"
                whileHover={{ scale: 1.1, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                07
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={723} y={156} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            METRICS & ACTIVITY
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Quantifying the journey • Tracking progress • Measuring impact
          </p>
        </motion.div>

        {/* Code Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <CodeMetricsDashboard />
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-lavender font-mono mb-2">
              GITHUB CONTRIBUTIONS
            </h3>
            <p className="text-gray-muted font-mono text-xs">
              365 days of commits, contributions, and code
            </p>
          </div>
          <GitHubActivityGraph />
        </motion.div>
      </div>
    </section>
  )
}
