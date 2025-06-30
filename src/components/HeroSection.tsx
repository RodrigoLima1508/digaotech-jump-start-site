
import React from 'react';
import { ChevronDown, Zap, Code, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-gold/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-30">
        {/* Floating icons */}
        <div className="absolute top-10 left-10 text-neon-blue animate-float">
          <Code className="w-8 h-8 opacity-60" />
        </div>
        <div className="absolute top-20 right-20 text-neon-gold animate-float" style={{animationDelay: '1s'}}>
          <Zap className="w-6 h-6 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-20 text-neon-blue animate-float" style={{animationDelay: '2s'}}>
          <Sparkles className="w-7 h-7 opacity-60" />
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-none">
            <span className="gradient-text animate-glow-pulse">DIGAOTECH</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-gold mx-auto mb-6 animate-pulse"></div>
        </div>

        {/* Hero title */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          Construindo o Futuro com
          <span className="block gradient-text">Tecnologia</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
          A Digaotech entrega soluções digitais inteligentes, escaláveis e de alto desempenho. 
          Transformamos ideias em realidade através de desenvolvimento web, mobile, automações e IA.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button
            onClick={scrollToServices}
            className="group px-8 py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 neon-glow relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Nossos Serviços</span>
              <Zap className="w-5 h-5 group-hover:animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <a
            href="#contact"
            className="group px-8 py-4 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Fale Conosco</span>
          </a>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: '100+', label: 'Projetos Entregues', icon: '🚀' },
            { number: '8+', label: 'Anos de Experiência', icon: '⭐' },
            { number: '50+', label: 'Clientes Satisfeitos', icon: '🎯' },
            { number: '24/7', label: 'Suporte Dedicado', icon: '💬' }
          ].map((stat, index) => (
            <div key={index} className="group text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105">
              <div className="text-2xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-neon-blue mb-2 group-hover:text-neon-gold transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-muted-foreground font-medium">Explore mais</span>
          <ChevronDown className="w-6 h-6 text-neon-blue animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
