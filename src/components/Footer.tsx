
import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-gold rounded-lg flex items-center justify-center neon-glow">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold gradient-text">DIGAOTECH</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Transformando ideias em soluções tecnológicas inovadoras. 
              Desenvolvimento web, mobile, automações e IA para impulsionar seu negócio.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'LinkedIn', url: '#', icon: '💼' },
                { name: 'GitHub', url: '#', icon: '🐙' },
                { name: 'Twitter', url: '#', icon: '🐦' },
                { name: 'Instagram', url: '#', icon: '📷' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-neon-blue/50 hover:scale-110 transition-all duration-300"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: 'Início', href: '#home' },
                { name: 'Sobre', href: '#about' },
                { name: 'Serviços', href: '#services' },
                { name: 'Projetos', href: '#projects' },
                { name: 'Contato', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-neon-blue transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {[
                'Desenvolvimento Web',
                'Apps Mobile',
                'Soluções Cloud',
                'Automações & IA',
                'APIs & Integrações',
                'Consultoria Tech'
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-muted-foreground text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-4 md:mb-0">
            <span>© {new Date().getFullYear()} Digaotech. Desenvolvido com</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>e muito ☕</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue/10 to-neon-gold/10 border border-neon-blue/20 rounded-lg hover:border-neon-blue/50 transition-all duration-300 group"
          >
            <span className="text-sm text-muted-foreground group-hover:text-neon-blue transition-colors duration-300">
              Voltar ao topo
            </span>
            <ArrowUp className="w-4 h-4 text-neon-blue group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
