/**
 * Section Component Examples
 * 
 * Demonstrates various usage patterns for the Section component.
 */

import { Section } from './Section';

/**
 * Example 1: Basic section with title
 */
export function BasicSectionExample() {
  return (
    <Section id="about" title="About Me">
      <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        This is a basic section with a title and default background.
      </p>
    </Section>
  );
}

/**
 * Example 2: Section with alternate background
 */
export function AlternateSectionExample() {
  return (
    <Section id="projects" title="My Projects" background="alternate">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: '0.5rem' 
        }}>
          Project Card 1
        </div>
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: '0.5rem' 
        }}>
          Project Card 2
        </div>
        <div style={{ 
          padding: '1.5rem', 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: '0.5rem' 
        }}>
          Project Card 3
        </div>
      </div>
    </Section>
  );
}

/**
 * Example 3: Section without title (Hero section pattern)
 */
export function HeroSectionExample() {
  return (
    <Section id="hero">
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 0' 
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700', 
          color: 'var(--color-text-primary)',
          marginBottom: '1rem'
        }}>
          Welcome to My Portfolio
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--color-text-secondary)' 
        }}>
          Full-stack developer specializing in modern web technologies
        </p>
      </div>
    </Section>
  );
}

/**
 * Example 4: Skills section with custom content layout
 */
export function SkillsSectionExample() {
  const skills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS'];

  return (
    <Section id="skills" title="Technical Skills" background="alternate">
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        justifyContent: 'center' 
      }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--color-interactive-primary)',
              color: 'var(--color-bg-primary)',
              borderRadius: '0.375rem',
              fontWeight: '500',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
}

/**
 * Example 5: Contact section with form
 */
export function ContactSectionExample() {
  return (
    <Section id="contact" title="Get In Touch" className="contact-section">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: '0.75rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '0.375rem',
              color: 'var(--color-text-primary)',
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={{
              padding: '0.75rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '0.375rem',
              color: 'var(--color-text-primary)',
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            style={{
              padding: '0.75rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '0.375rem',
              color: 'var(--color-text-primary)',
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--color-interactive-primary)',
              color: 'var(--color-bg-primary)',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </Section>
  );
}

/**
 * Example 6: Multiple sections demonstrating alternating backgrounds
 */
export function MultipleSectionsExample() {
  return (
    <>
      <Section id="section1" title="Section 1" background="default">
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          Default background
        </p>
      </Section>
      
      <Section id="section2" title="Section 2" background="alternate">
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          Alternate background
        </p>
      </Section>
      
      <Section id="section3" title="Section 3" background="default">
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          Default background
        </p>
      </Section>
    </>
  );
}
