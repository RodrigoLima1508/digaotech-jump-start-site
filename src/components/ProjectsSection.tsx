
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Projetos featured (destacados)
  const featuredProjects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma completa de e-commerce com React, Node.js, Stripe e dashboard administrativo.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      demo: "#",
      github: "#"
    },
    {
      title: "Sistema de Gestão",
      description: "ERP completo para pequenas e médias empresas com controle de estoque, vendas e financeiro.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["Vue.js", "Laravel", "MySQL", "Docker"],
      demo: "#",
      github: "#"
    },
    {
      title: "App de Delivery",
      description: "Aplicativo mobile para delivery com geolocalização, pagamentos online e sistema de avaliações.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["React Native", "Firebase", "Maps API", "PayPal"],
      demo: "#",
      github: "#"
    }
  ];

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        // Simulando dados do GitHub (substitua por uma chamada real à API)
        const mockRepos: GitHubRepo[] = [
          {
            id: 1,
            name: "digaotech-portfolio",
            description: "Website moderno e responsivo desenvolvido com React e TypeScript",
            html_url: "https://github.com/digaotech/portfolio",
            homepage: "https://digaotech.com",
            stargazers_count: 45,
            forks_count: 12,
            language: "TypeScript",
            topics: ["react", "typescript", "tailwind"],
            updated_at: "2024-01-15T10:00:00Z"
          },
          {
            id: 2,
            name: "automation-tools",
            description: "Conjunto de ferramentas para automação de processos empresariais",
            html_url: "https://github.com/digaotech/automation",
            homepage: "",
            stargazers_count: 23,
            forks_count: 8,
            language: "Python",
            topics: ["python", "automation", "rpa"],
            updated_at: "2024-01-10T15:30:00Z"
          },
          {
            id: 3,
            name: "api-integration-hub",
            description: "Hub centralizado para integrações de APIs com documentação automática",
            html_url: "https://github.com/digaotech/api-hub",
            homepage: "https://api.digaotech.com",
            stargazers_count: 67,
            forks_count: 19,
            language: "Node.js",
            topics: ["nodejs", "api", "documentation"],
            updated_at: "2024-01-20T09:15:00Z"
          }
        ];
        
        setRepos(mockRepos);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar projetos do GitHub');
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Node.js': 'bg-green-600',
      'React': 'bg-cyan-500',
      'Vue.js': 'bg-emerald-500'
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-gold mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes e contribuições open source.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Projetos em Destaque</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-neon-blue/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 text-neon-blue hover:text-neon-gold transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-neon-blue transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repositories */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Github className="w-6 h-6 text-neon-blue" />
            <h3 className="text-2xl font-bold">Repositórios Open Source</h3>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando projetos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-card rounded-xl p-6 border border-border hover:border-neon-blue/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold group-hover:text-neon-blue transition-colors duration-300">
                      {repo.name}
                    </h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-neon-blue transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                        <span className="text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-2 py-0.5 bg-neon-blue/10 text-neon-blue text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Interessado em um projeto personalizado?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 neon-glow"
          >
            <span>Iniciar Projeto</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
