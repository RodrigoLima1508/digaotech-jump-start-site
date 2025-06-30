
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marina Silva",
      company: "TechStart Inovações",
      position: "CEO",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "A Digaotech transformou completamente nossa operação digital. O sistema de automação que desenvolveram aumentou nossa produtividade em 300%. Profissionais extremamente competentes!",
      project: "Sistema de Automação Empresarial"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      company: "E-commerce Plus",
      position: "CTO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "Trabalhar com a Digaotech foi uma experiência fantástica. Eles entregaram nossa plataforma de e-commerce antes do prazo e com qualidade excepcional. Recomendo sem hesitar!",
      project: "Plataforma E-commerce"
    },
    {
      id: 3,
      name: "Ana Rodrigues",
      company: "HealthTech Solutions",
      position: "Diretora de Inovação",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "O app mobile que a Digaotech desenvolveu para nossa clínica revolucionou o atendimento aos pacientes. Interface intuitiva, performance excelente e suporte técnico impecável.",
      project: "Aplicativo Mobile para Saúde"
    },
    {
      id: 4,
      name: "Roberto Santos",
      company: "LogiTrans Brasil",
      position: "Gerente de TI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "A solução de IA que implementaram em nosso sistema de logística otimizou nossas rotas e reduziu custos em 40%. Equipe altamente qualificada e sempre disponível.",
      project: "Otimização com IA"
    },
    {
      id: 5,
      name: "Fernanda Costa",
      company: "EduTech Online",
      position: "Fundadora",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "Nossa plataforma de ensino online nunca foi tão robusta! A Digaotech superou todas nossas expectativas com uma arquitetura escalável e recursos inovadores.",
      project: "Plataforma de Ensino EAD"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O que nossos <span className="gradient-text">clientes</span> dizem
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-gold mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Depoimentos reais de clientes que confiaram na Digaotech para transformar seus negócios.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-card rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 text-6xl text-neon-blue/10">
              <Quote className="w-16 h-16" />
            </div>
            <div className="absolute bottom-6 right-6 text-6xl text-neon-gold/10 transform rotate-180">
              <Quote className="w-16 h-16" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: currentTestimonialData.rating }).map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-neon-gold fill-current" />
                ))}
              </div>

              {/* Comment */}
              <blockquote className="text-lg md:text-xl text-center leading-relaxed mb-8 font-medium">
                "{currentTestimonialData.comment}"
              </blockquote>

              {/* Project info */}
              <div className="text-center text-sm text-neon-blue mb-6 font-semibold">
                Projeto: {currentTestimonialData.project}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={currentTestimonialData.avatar}
                  alt={currentTestimonialData.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-neon-blue/20"
                />
                <div className="text-center">
                  <h4 className="font-bold text-lg">{currentTestimonialData.name}</h4>
                  <p className="text-muted-foreground">{currentTestimonialData.position}</p>
                  <p className="text-neon-blue font-semibold text-sm">{currentTestimonialData.company}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-neon-blue/10 hover:bg-neon-blue/20 rounded-full transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-neon-blue group-hover:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-neon-blue/10 hover:bg-neon-blue/20 rounded-full transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-neon-blue group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-neon-blue scale-125'
                    : 'bg-muted-foreground/30 hover:bg-neon-blue/50'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-neon-blue transition-colors duration-300"
            >
              {isAutoPlaying ? '⏸️ Pausar' : '▶️ Reproduzir'} slideshow automático
            </button>
          </div>
        </div>

        {/* Mini testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                index === currentTestimonial % 3
                  ? 'border-neon-blue/50 bg-neon-blue/5'
                  : 'border-border hover:border-neon-blue/30'
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-semibold text-sm">{testimonial.name}</h5>
                  <p className="text-muted-foreground text-xs">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="w-4 h-4 text-neon-gold fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {testimonial.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
