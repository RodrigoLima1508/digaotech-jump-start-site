
import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-neon-blue/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-gold/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="gradient-text animate-glow-pulse">DIGAOTECH</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-gold mx-auto mb-6"></div>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-light text-muted-foreground mb-8">
          Transformando ideias em
          <span className="text-neon-blue font-semibold"> soluções tecnológicas</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Desenvolvimento de sistemas, automações inteligentes, integrações de APIs e soluções em IA 
          para impulsionar seu negócio para o futuro digital.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 neon-glow"
          >
            Ver Projetos
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300"
          >
            Fale Conosco
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Projetos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-gold mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Anos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">30+</div>
            <div className="text-sm text-muted-foreground">Clientes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-gold mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-neon-blue" />
      </div>
    </section>
  );
};

export default HeroSection;
