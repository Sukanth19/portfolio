/**
 * Site Configuration
 * 
 * Central configuration for site metadata, author information, and SEO settings.
 * 
 * @see Requirements 17.2, 17.5
 */

export interface SiteConfig {
  name: string;
  description: string;
  author: {
    name: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Portfolio",
  description: "Personal portfolio website showcasing projects and skills",
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
  seo: {
    title: "Portfolio - Your Name",
    description: "Personal portfolio website showcasing projects, skills, and experience in web development",
    keywords: [
      "portfolio",
      "web development",
      "projects",
      "software engineer",
      "full stack developer",
      "TypeScript",
      "React",
      "Next.js",
    ],
    ogImage: "/og-image.png",
  },
};
