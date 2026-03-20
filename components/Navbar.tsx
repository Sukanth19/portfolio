/**
 * Navbar Component
 * 
 * Sticky navigation bar with theme switcher integration and smooth scroll navigation.
 * Responsive design with mobile menu for small viewports.
 * 
 * @see Requirements 5.2, 5.3, 5.4, 13.3
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

/**
 * Navigation link interface
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Navbar component props
 */
export interface NavbarProps {
  /**
   * Navigation links to display
   */
  links?: NavLink[];
  /**
   * Whether to show the theme switcher (defaults to true)
   */
  showThemeSwitcher?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Default navigation links for portfolio sections
 */
const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Navbar component
 * 
 * Provides sticky navigation with smooth scrolling to sections,
 * integrated theme switcher, and responsive mobile menu.
 */
export function Navbar({
  links = DEFAULT_LINKS,
  showThemeSwitcher = true,
  className = '',
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /**
   * Handle smooth scroll navigation
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle internal links (starting with #)
    if (!href.startsWith('#')) return;

    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="brand-link"
            aria-label="Go to home"
          >
            Portfolio
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-only">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme Switcher (Desktop) */}
        {showThemeSwitcher && (
          <div className="navbar-theme-switcher desktop-only">
            <ThemeSwitcher variant="compact" />
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          aria-controls="mobile-menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen ? 'true' : 'false'}
      >
        <div className="mobile-menu-content">
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="mobile-nav-link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme Switcher (Mobile) */}
          {showThemeSwitcher && (
            <div className="mobile-theme-switcher">
              <ThemeSwitcher variant="buttons" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--color-bg-primary);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-duration-normal) var(--transition-easing);
        }

        .navbar.scrolled {
          background: var(--color-bg-secondary);
          border-bottom-color: var(--color-border-default);
          box-shadow: var(--effect-shadow-md);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .navbar-brand {
          flex-shrink: 0;
        }

        .brand-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color var(--transition-duration-fast) var(--transition-easing);
        }

        .brand-link:hover {
          color: var(--color-interactive-primary);
        }

        .brand-link:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: color var(--transition-duration-fast) var(--transition-easing);
          position: relative;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-link:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-interactive-primary);
          transform: scaleX(0);
          transition: transform var(--transition-duration-fast) var(--transition-easing);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .navbar-theme-switcher {
          flex-shrink: 0;
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        .mobile-menu-button:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 24px;
          height: 18px;
        }

        .hamburger-line {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--color-text-primary);
          transition: all var(--transition-duration-fast) var(--transition-easing);
          border-radius: 2px;
        }

        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-bg-primary);
          transform: translateX(100%);
          transition: transform var(--transition-duration-normal) var(--transition-easing);
          z-index: 999;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-content {
          padding: 6rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          min-height: 100%;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          color: var(--color-text-primary);
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
          transition: color var(--transition-duration-fast) var(--transition-easing);
          padding: 0.5rem 0;
        }

        .mobile-nav-link:hover {
          color: var(--color-interactive-primary);
        }

        .mobile-nav-link:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .mobile-theme-switcher {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-default);
        }

        /* Responsive Breakpoints */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .mobile-menu-button {
            display: flex;
          }

          .navbar-container {
            padding: 1rem;
          }

          .brand-link {
            font-size: 1.25rem;
          }
        }

        /* Theme-specific enhancements for Miami Nights */
        :global([data-theme="miami-nights"]) .navbar.scrolled {
          box-shadow: 0 4px 20px rgba(255, 0, 110, 0.2);
        }

        :global([data-theme="miami-nights"]) .brand-link {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Theme-specific enhancements for Vesper */
        :global([data-theme="vesper"]) .nav-link:hover {
          color: var(--color-text-accent);
        }

        :global([data-theme="vesper"]) .nav-link::after {
          background: var(--color-text-accent);
        }
      `}</style>
    </nav>
  );
}
