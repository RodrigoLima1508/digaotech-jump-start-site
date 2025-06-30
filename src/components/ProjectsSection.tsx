
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Filter, Search } from 'lucide-react';
import { githubApi, GitHubRepo } from '../services/githubApi';

const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Featured projects (manual showcase)
  const featuredProjects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma completa de e-commerce com React, Node.js, Stripe e dashboard administrativo.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      demo: "#",
      github: "#",
      featured: true
    },
    {
      title: "Sistema de Gestão",
      description: "ERP completo para pequenas e médias empresas com controle de estoque, vendas e financeiro.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["Vue.js", "Laravel", "MySQL", "Docker"],
      demo: "#",
      github: "#",
      featured: true
    },
    {
      title: "App de Delivery",
      description: "Aplicativo mobile para delivery com geolocalização, pagamentos online e sistema de avaliações.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tech: ["React Native", "Firebase", "Maps API", "PayPal"],
      demo: "#",
      github: "#",
      featured: true
    }
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const repoData = await githubApi.fetchUserRepos();
        setRepos(repoData);
        setFilteredRepos(repoData);
      } catch (err) {
        setError('Erro ao carregar projetos do GitHub');
        console.error('Error fetching repos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    let filtered = repos;

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(repo => repo.language === selectedLanguage);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRepos(filtered);
  }, [repos, selectedLanguage, searchTerm]);

  const languages = React.useMemo(() => {
    const langs = repos
      .map(repo => repo.language)
      .filter((lang): lang is string => lang !== null);
    return Array.from(new Set(langs));
  }, [repos]);

  const ProjectCard: React.FC<{ repo: GitHubRepo }> = ({ repo }) => (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-neon-blue/50 transition-all duration-300 group hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold group-hover:text-neon-blue transition-colors duration-300 line-clamp-1">
          {repo.name}
        </h4>
        <div className="flex items-center space-x-2">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-gold transition-colors duration-300"
              title="Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-blue transition-colors duration-300"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {repo.description && (
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${githubApi.getLanguageColor(repo.language)}`}></div>
              <span className="text-muted-foreground">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground text-xs">
          <Calendar className="w-3 h-3" />
          <span>{githubApi.formatDate(repo.updated_at)}</span>
        </div>
      </div>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map((topic, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-neon-blue/10 text-neon-blue text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Galeria de <span className="gradient-text">Projetos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-gold mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça nossos projetos em destaque e contribuições open source sincronizadas diretamente do GitHub.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
            <span>🌟 Projetos em Destaque</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-neon-gold/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-neon-gold text-black px-2 py-1 rounded-full text-xs font-bold">
                    Destaque
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 group-hover:text-neon-gold transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-neon-gold/10 text-neon-gold text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 text-neon-gold hover:text-neon-blue transition-colors duration-300"
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Github className="w-6 h-6 text-neon-blue" />
              <h3 className="text-2xl font-bold">Repositórios GitHub</h3>
              <div className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-sm rounded-full">
                Sincronizado
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent text-sm"
                />
              </div>
              
              {/* Language Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-card border border-border rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent text-sm appearance-none"
                >
                  <option value="all">Todas linguagens</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando projetos do GitHub...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-card rounded-xl border border-red-200">
              <p className="text-red-500 mb-4">{error}</p>
              <p className="text-muted-foreground text-sm">Mostrando projetos de exemplo</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredRepos.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
              
              {filteredRepos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum projeto encontrado com os filtros aplicados.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-neon-blue/10 to-neon-gold/10 rounded-2xl p-8 border border-neon-blue/20">
          <h3 className="text-2xl font-bold mb-4">Interessado em um projeto personalizado?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Trabalhamos com as mais modernas tecnologias para entregar soluções que fazem a diferença. 
            Vamos transformar sua ideia em realidade!
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
