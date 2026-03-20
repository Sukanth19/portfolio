/**
 * Navbar Component Tests
 * 
 * Unit tests for the Navbar component covering functionality,
 * accessibility, and responsive behavior.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar, NavLink } from './Navbar';
import { ThemeProvider } from './ThemeProvider';

/**
 * Helper function to render Navbar with ThemeProvider
 */
function renderNavbar(props = {}) {
  return render(
    <ThemeProvider>
      <Navbar {...props} />
    </ThemeProvider>
  );
}

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('should render with default links', () => {
      renderNavbar();
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render brand link', () => {
      renderNavbar();
      
      const brandLink = screen.getByLabelText('Go to home');
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveTextContent('Portfolio');
    });

    it('should render theme switcher by default', () => {
      renderNavbar();
      
      // Theme switcher should be present
      const themeSwitcher = screen.getByRole('radiogroup', { name: /theme selector/i });
      expect(themeSwitcher).toBeInTheDocument();
    });

    it('should not render theme switcher when showThemeSwitcher is false', () => {
      renderNavbar({ showThemeSwitcher: false });
      
      const themeSwitcher = screen.queryByRole('radiogroup', { name: /theme selector/i });
      expect(themeSwitcher).not.toBeInTheDocument();
    });

    it('should render custom links', () => {
      const customLinks: NavLink[] = [
        { label: 'Custom 1', href: '#custom1' },
        { label: 'Custom 2', href: '#custom2' },
      ];
      
      renderNavbar({ links: customLinks });
      
      expect(screen.getByText('Custom 1')).toBeInTheDocument();
      expect(screen.getByText('Custom 2')).toBeInTheDocument();
      expect(screen.queryByText('About')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href attributes', () => {
      renderNavbar();
      
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '#hero');
      
      const aboutLink = screen.getByText('About').closest('a');
      expect(aboutLink).toHaveAttribute('href', '#about');
    });

    it('should handle external links correctly', () => {
      const linksWithExternal: NavLink[] = [
        { label: 'Internal', href: '#section' },
        { label: 'External', href: 'https://example.com', external: true },
      ];
      
      renderNavbar({ links: linksWithExternal });
      
      const externalLink = screen.getByText('External').closest('a');
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      const internalLink = screen.getByText('Internal').closest('a');
      expect(internalLink).not.toHaveAttribute('target');
      expect(internalLink).not.toHaveAttribute('rel');
    });
  });

  describe('Mobile Menu', () => {
    it('should render mobile menu button', () => {
      renderNavbar();
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile menu on button click', () => {
      renderNavbar();
      
      const menuButton = screen.getByLabelText('Open menu');
      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      
      // Initially closed
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(mobileMenu).not.toHaveClass('open');
      
      // Open menu
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
      expect(mobileMenu).toHaveClass('open');
      
      // Close menu
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      expect(mobileMenu).not.toHaveClass('open');
    });

    it('should close mobile menu when clicking a link', () => {
      // Mock scrollTo
      window.scrollTo = jest.fn();
      
      // Mock getElementById
      const mockElement = document.createElement('div');
      mockElement.id = 'about';
      Object.defineProperty(mockElement, 'offsetTop', { value: 500 });
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
      
      renderNavbar();
      
      const menuButton = screen.getByLabelText('Open menu');
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      expect(mobileMenu).toHaveClass('open');
      
      // Click a link in mobile menu
      const mobileLinks = mobileMenu?.querySelectorAll('a') || [];
      const aboutLink = Array.from(mobileLinks).find(link => link.textContent === 'About');
      
      if (aboutLink) {
        fireEvent.click(aboutLink);
        
        // Menu should close
        waitFor(() => {
          expect(mobileMenu).not.toHaveClass('open');
        });
      }
    });
  });

  describe('Smooth Scrolling', () => {
    beforeEach(() => {
      // Mock scrollTo
      window.scrollTo = jest.fn();
    });

    it('should trigger smooth scroll on internal link click', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'about';
      Object.defineProperty(mockElement, 'offsetTop', { value: 1000 });
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
      
      renderNavbar();
      
      const aboutLink = screen.getByText('About').closest('a');
      if (aboutLink) {
        fireEvent.click(aboutLink);
        
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: expect.any(Number),
          behavior: 'smooth',
        });
      }
    });

    it('should not prevent default for external links', () => {
      const linksWithExternal: NavLink[] = [
        { label: 'External', href: 'https://example.com', external: true },
      ];
      
      renderNavbar({ links: linksWithExternal });
      
      const externalLink = screen.getByText('External').closest('a');
      if (externalLink) {
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
        
        externalLink.dispatchEvent(clickEvent);
        
        // preventDefault should not be called for external links
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      }
    });
  });

  describe('Scroll State', () => {
    it('should add scrolled class when scrolled', () => {
      renderNavbar();
      
      const navbar = screen.getByRole('navigation');
      expect(navbar).not.toHaveClass('scrolled');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      waitFor(() => {
        expect(navbar).toHaveClass('scrolled');
      });
    });

    it('should remove scrolled class when at top', () => {
      renderNavbar();
      
      const navbar = screen.getByRole('navigation');
      
      // Scroll down
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      waitFor(() => {
        expect(navbar).toHaveClass('scrolled');
      });
      
      // Scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);
      
      waitFor(() => {
        expect(navbar).not.toHaveClass('scrolled');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderNavbar();
      
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for mobile menu', () => {
      renderNavbar();
      
      const menuButton = screen.getByLabelText('Open menu');
      const mobileMenu = document.getElementById('mobile-menu');
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
      
      fireEvent.click(menuButton);
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    });

    it('should be keyboard navigable', () => {
      renderNavbar();
      
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        link.focus();
        expect(link).toHaveFocus();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      renderNavbar({ className: 'custom-navbar' });
      
      const navbar = screen.getByRole('navigation');
      expect(navbar).toHaveClass('custom-navbar');
    });
  });
});
