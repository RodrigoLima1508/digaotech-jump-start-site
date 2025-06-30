
import React from 'react';
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Zap, 
  Database, 
  Shield,
  ArrowRight,
  Palette
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Desenvolvimento Web",
      description: "Aplicações web modernas e responsivas usando React, Next.js, TypeScript e as mais recentes tecnologias.",
      features: ["React & Next.js", "TypeScript", "Tailwind CSS", "PWA"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Aplicativos Mobile",
      description: "Apps nativos e híbridos para iOS e Android com performance excepcional e UX intuitiva.",
      features: ["React Native", "Flutter", "iOS & Android", "App Store"],
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Soluções Cloud",
      description: "Infraestrutura escalável na nuvem com AWS, Azure e Google Cloud Platform.",
      features: ["AWS & Azure", "Docker", "Kubernetes", "CI/CD"],
      color: "from-purple-500 to-violet-400"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Automações & IA",
      description: "Automação de processos e integração de IA para otimizar operações e reduzir custos.",
      features: ["Machine Learning", "Chatbots", "RPA", "APIs IA"],
      color: "from-yellow-500 to-orange-400"
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "APIs & Integrações",
      description: "Desenvolvimento de APIs RESTful e GraphQL, integrações com sistemas externos.",
      features: ["REST & GraphQL", "Microserviços", "Webhooks", "ETL"],
      color: "from-red-500 to-pink-400"
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Design UX/UI",
      description: "Interfaces modernas e intuitivas com foco na experiência do usuário.",
      features: ["UI Design", "UX Research", "Protótipos", "Design System"],
      color: "from-teal-500 to-cyan-400"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Serviços</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas em tecnologia, desde o desenvolvimento até a implementação e manutenção.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-transparent transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-cyan-400 font-semibold text-sm group-hover:text-blue-500 transition-colors duration-300">
                  <span className="mr-2">Saiba mais</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">
            Nosso <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Processo</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Análise", desc: "Entendemos suas necessidades e objetivos" },
              { step: "02", title: "Planejamento", desc: "Criamos a estratégia e arquitetura da solução" },
              { step: "03", title: "Desenvolvimento", desc: "Desenvolvemos com metodologias ágeis" },
              { step: "04", title: "Entrega", desc: "Deploy, testes e suporte contínuo" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
