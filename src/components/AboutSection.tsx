
import React from 'react';
import { Code, Zap, Users, Award, Target, Eye, Heart } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Código Limpo",
      description: "Desenvolvimento com as melhores práticas e padrões da indústria"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description: "Soluções otimizadas para máxima velocidade e eficiência"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Colaboração",
      description: "Trabalho em equipe e comunicação transparente em todos os projetos"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Qualidade",
      description: "Compromisso com a excelência em cada linha de código"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre a <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Digaotech</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos uma empresa especializada em transformar desafios complexos em soluções tecnológicas elegantes e eficientes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-white">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Democratizar o acesso à tecnologia de ponta, oferecendo soluções inovadoras 
                  que impulsionam o crescimento e a eficiência dos nossos clientes, sempre 
                  priorizando a qualidade, a segurança e a sustentabilidade.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser referência nacional em desenvolvimento de soluções tecnológicas personalizadas, 
                  reconhecida pela excelência técnica, inovação constante e pelo impacto positivo 
                  que geramos na transformação digital das empresas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-purple-500">Nossos Valores</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Excelência em cada projeto</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Inovação constante</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Transparência total</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Compromisso com prazos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-xl border border-border hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-cyan-400 mb-4 group-hover:text-blue-500 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Nossa <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Equipe</span>
          </h3>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                DT
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold mb-2">Rodrigo Santos</h4>
                <p className="text-cyan-400 font-semibold mb-3">Founder & CEO</p>
                <p className="text-muted-foreground leading-relaxed">
                  Desenvolvedor Full Stack com mais de 8 anos de experiência em tecnologias web modernas, 
                  especialista em React, Node.js, Python e arquiteturas cloud. Apaixonado por criar 
                  soluções que fazem a diferença no mundo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
