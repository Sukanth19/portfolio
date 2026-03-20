/**
 * AnimatedElement Component Examples
 * 
 * Demonstrates various usage patterns for the AnimatedElement component.
 */

import { AnimatedElement } from './AnimatedElement';

export function AnimatedElementExamples() {
  return (
    <div className="space-y-12 p-8">
      {/* Fade Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Fade Animation</h2>
        <AnimatedElement animation="fade">
          <div className="p-6 bg-gray-100 rounded-lg">
            This content fades in smoothly
          </div>
        </AnimatedElement>
      </section>

      {/* Slide Animations - All Directions */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Slide Animations</h2>
        <div className="grid grid-cols-2 gap-4">
          <AnimatedElement animation="slide" direction="up">
            <div className="p-6 bg-blue-100 rounded-lg">
              Slides up from bottom
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide" direction="down">
            <div className="p-6 bg-green-100 rounded-lg">
              Slides down from top
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide" direction="left">
            <div className="p-6 bg-purple-100 rounded-lg">
              Slides left from right
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide" direction="right">
            <div className="p-6 bg-pink-100 rounded-lg">
              Slides right from left
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Scale Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Scale Animation</h2>
        <AnimatedElement animation="scale">
          <div className="p-6 bg-yellow-100 rounded-lg">
            This content scales in from 90% to 100%
          </div>
        </AnimatedElement>
      </section>

      {/* Staggered Animations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Staggered Animations</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item, index) => (
            <AnimatedElement
              key={item}
              animation="slide"
              direction="up"
              delay={index * 0.1}
            >
              <div className="p-4 bg-indigo-100 rounded-lg">
                Item {item} - Delayed by {index * 100}ms
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* Custom Duration */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Duration</h2>
        <div className="grid grid-cols-3 gap-4">
          <AnimatedElement animation="fade" duration={0.2}>
            <div className="p-6 bg-red-100 rounded-lg">
              Fast (200ms)
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade" duration={0.4}>
            <div className="p-6 bg-orange-100 rounded-lg">
              Normal (400ms)
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade" duration={0.6}>
            <div className="p-6 bg-amber-100 rounded-lg">
              Slow (600ms max)
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Hero Section Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hero Section Example</h2>
        <div className="space-y-4">
          <AnimatedElement animation="fade" duration={0.6}>
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
          </AnimatedElement>

          <AnimatedElement animation="slide" direction="up" delay={0.2}>
            <p className="text-xl text-gray-600">
              Full-stack developer specializing in React and TypeScript
            </p>
          </AnimatedElement>

          <AnimatedElement animation="scale" delay={0.4}>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              View My Work
            </button>
          </AnimatedElement>
        </div>
      </section>

      {/* Project Cards Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Project Cards Example</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((project, index) => (
            <AnimatedElement
              key={project}
              animation="scale"
              delay={index * 0.15}
            >
              <div className="p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                <p className="text-gray-600">
                  A description of this amazing project
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>
    </div>
  );
}
