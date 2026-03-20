/**
 * Navbar Component Examples
 * 
 * Demonstrates various usage patterns for the Navbar component.
 */

import { Navbar, NavLink } from './Navbar';

/**
 * Example 1: Basic Usage with Default Links
 */
export function BasicNavbarExample() {
  return (
    <div style={{ minHeight: '200vh', paddingTop: '80px' }}>
      <Navbar />
      
      <div style={{ padding: '2rem' }}>
        <h1 id="hero">Hero Section</h1>
        <p>Scroll down to see the navbar stick and change appearance.</p>
        
        <div style={{ marginTop: '100vh' }}>
          <h2 id="about">About Section</h2>
          <p>The navbar remains visible and accessible.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 2: Custom Navigation Links
 */
export function CustomLinksNavbarExample() {
  const customLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Work', href: '#projects' },
    { label: 'Resume', href: '/resume.pdf', external: true },
    { label: 'Blog', href: 'https://blog.example.com', external: true },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div style={{ minHeight: '200vh', paddingTop: '80px' }}>
      <Navbar links={customLinks} />
      
      <div style={{ padding: '2rem' }}>
        <h1 id="hero">Portfolio with Custom Links</h1>
        <p>This navbar includes external links that open in new tabs.</p>
      </div>
    </div>
  );
}

/**
 * Example 3: Navbar Without Theme Switcher
 */
export function NoThemeSwitcherNavbarExample() {
  return (
    <div style={{ minHeight: '200vh', paddingTop: '80px' }}>
      <Navbar showThemeSwitcher={false} />
      
      <div style={{ padding: '2rem' }}>
        <h1 id="hero">Minimal Navbar</h1>
        <p>This navbar doesn't include the theme switcher.</p>
      </div>
    </div>
  );
}

/**
 * Example 4: Minimal Links Configuration
 */
export function MinimalNavbarExample() {
  const minimalLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div style={{ minHeight: '200vh', paddingTop: '80px' }}>
      <Navbar links={minimalLinks} />
      
      <div style={{ padding: '2rem' }}>
        <h1 id="hero">Minimal Navigation</h1>
        <p>A simplified navbar with only essential links.</p>
        
        <div style={{ marginTop: '50vh' }}>
          <h2 id="projects">Projects Section</h2>
          <p>Click navbar links to see smooth scrolling.</p>
        </div>
        
        <div style={{ marginTop: '50vh' }}>
          <h2 id="contact">Contact Section</h2>
          <p>The navbar adapts to mobile viewports with a hamburger menu.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 5: Full Portfolio Layout
 */
export function FullPortfolioNavbarExample() {
  return (
    <div style={{ minHeight: '500vh', paddingTop: '80px' }}>
      <Navbar />
      
      <section id="hero" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg-primary)' }}>
        <h1>Hero Section</h1>
        <p>Welcome to the portfolio. Use the navbar to navigate between sections.</p>
      </section>
      
      <section id="about" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg-secondary)' }}>
        <h2>About Section</h2>
        <p>Information about the developer.</p>
      </section>
      
      <section id="projects" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg-primary)' }}>
        <h2>Projects Section</h2>
        <p>Portfolio projects showcase.</p>
      </section>
      
      <section id="skills" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg-secondary)' }}>
        <h2>Skills Section</h2>
        <p>Technical skills and competencies.</p>
      </section>
      
      <section id="contact" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg-primary)' }}>
        <h2>Contact Section</h2>
        <p>Get in touch.</p>
      </section>
    </div>
  );
}

/**
 * Example 6: Testing Mobile Responsiveness
 * 
 * To test mobile menu:
 * 1. Resize browser to mobile width (≤768px)
 * 2. Click hamburger menu button
 * 3. Navigate using mobile menu
 * 4. Test theme switcher in mobile view
 */
export function MobileResponsiveNavbarExample() {
  return (
    <div style={{ minHeight: '300vh', paddingTop: '80px' }}>
      <Navbar />
      
      <div style={{ padding: '2rem' }}>
        <h1 id="hero">Mobile Responsive Test</h1>
        <p>Resize your browser to test mobile menu behavior:</p>
        <ul>
          <li>Desktop (>768px): Horizontal navigation</li>
          <li>Mobile (≤768px): Hamburger menu</li>
          <li>Theme switcher adapts to viewport size</li>
        </ul>
        
        <div style={{ marginTop: '100vh' }}>
          <h2 id="about">Scroll Test</h2>
          <p>Scroll to see navbar stick and change appearance.</p>
        </div>
        
        <div style={{ marginTop: '100vh' }}>
          <h2 id="projects">Navigation Test</h2>
          <p>Click links to test smooth scrolling.</p>
        </div>
      </div>
    </div>
  );
}
