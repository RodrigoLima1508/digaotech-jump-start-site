
import React, { useState, useEffect } from 'react';
import MarioAnimation from '../components/MarioAnimation';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  const [showMarioAnimation, setShowMarioAnimation] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if animation was already shown in this session
    const animationShown = sessionStorage.getItem('marioAnimationShown');
    if (animationShown) {
      setShowMarioAnimation(false);
      setShowContent(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowMarioAnimation(false);
    setShowContent(true);
    sessionStorage.setItem('marioAnimationShown', 'true');
  };

  return (
    <div className="min-h-screen">
      {/* Mario Animation */}
      {showMarioAnimation && (
        <MarioAnimation onComplete={handleAnimationComplete} />
      )}

      {/* Main Content */}
      {showContent && (
        <div className="animate-fade-in">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
