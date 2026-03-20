/**
 * Portfolio Website Main Page
 * 
 * Main landing page with all portfolio sections.
 * Implements mobile-first responsive design (320px to 2560px).
 * 
 * @see Requirements 5.1, 5.3, 5.4, 13.3
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ProjectModal } from '@/components/ProjectModal';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import { Project } from '@/lib/data';
import { featureFlags } from '@/config/features';

// Lazy load NeuralBackground only when enabled
const NeuralBackground = dynamic(
  () => import('@/components/NeuralBackground').then(mod => ({ default: mod.NeuralBackground })),
  { ssr: false }
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the project to allow modal close animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      {/* Neural Network Background */}
      {featureFlags.enableNeuralBackground && <NeuralBackground />}

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="main-content">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection onProjectClick={handleProjectClick} />

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        .main-content {
          padding-top: 80px; /* Account for fixed navbar */
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
