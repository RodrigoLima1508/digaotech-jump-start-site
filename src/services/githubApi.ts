
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  private: boolean;
}

export class GitHubApiService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'digaotech'; // Replace with actual GitHub username

  async fetchUserRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=20`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Filter out private repos and add topics
      const publicRepos = repos.filter(repo => !repo.private);
      
      // Get topics for each repo (requires separate API call)
      const reposWithTopics = await Promise.all(
        publicRepos.map(async (repo) => {
          try {
            const topicsResponse = await fetch(`${this.baseUrl}/repos/${this.username}/${repo.name}/topics`);
            if (topicsResponse.ok) {
              const topicsData = await topicsResponse.json();
              repo.topics = topicsData.names || [];
            }
          } catch (error) {
            console.warn(`Failed to fetch topics for ${repo.name}:`, error);
            repo.topics = [];
          }
          return repo;
        })
      );

      return reposWithTopics;
    } catch (error) {
      console.error('Failed to fetch GitHub repositories:', error);
      return this.getMockRepos(); // Fallback to mock data
    }
  }

  private getMockRepos(): GitHubRepo[] {
    return [
      {
        id: 1,
        name: "digaotech-website",
        description: "Site oficial da Digaotech desenvolvido com React e Tailwind CSS",
        html_url: "https://github.com/digaotech/digaotech-website",
        homepage: "https://digaotech.com",
        language: "TypeScript",
        stargazers_count: 15,
        forks_count: 3,
        updated_at: "2024-01-15T10:30:00Z",
        topics: ["react", "tailwind", "typescript", "website"],
        private: false
      },
      {
        id: 2,
        name: "ecommerce-platform",
        description: "Plataforma completa de e-commerce com React, Node.js e MongoDB",
        html_url: "https://github.com/digaotech/ecommerce-platform",
        homepage: null,
        language: "JavaScript",
        stargazers_count: 28,
        forks_count: 7,
        updated_at: "2024-01-10T14:20:00Z",
        topics: ["ecommerce", "react", "nodejs", "mongodb"],
        private: false
      },
      {
        id: 3,
        name: "mobile-app-template",
        description: "Template base para aplicativos React Native com navegação e autenticação",
        html_url: "https://github.com/digaotech/mobile-app-template",
        homepage: null,
        language: "TypeScript",
        stargazers_count: 42,
        forks_count: 12,
        updated_at: "2024-01-08T09:15:00Z",
        topics: ["react-native", "mobile", "template", "authentication"],
        private: false
      },
      {
        id: 4,
        name: "automation-scripts",
        description: "Coleção de scripts Python para automação de tarefas e RPA",
        html_url: "https://github.com/digaotech/automation-scripts",
        homepage: null,
        language: "Python",
        stargazers_count: 19,
        forks_count: 5,
        updated_at: "2024-01-05T16:45:00Z",
        topics: ["python", "automation", "rpa", "scripts"],
        private: false
      },
      {
        id: 5,
        name: "api-gateway",
        description: "Gateway de APIs com autenticação, rate limiting e monitoramento",
        html_url: "https://github.com/digaotech/api-gateway",
        homepage: null,
        language: "TypeScript",
        stargazers_count: 31,
        forks_count: 8,
        updated_at: "2024-01-03T11:30:00Z",
        topics: ["api", "gateway", "authentication", "monitoring"],
        private: false
      },
      {
        id: 6,
        name: "ml-model-pipeline",
        description: "Pipeline de Machine Learning com TensorFlow e Python para análise de dados",
        html_url: "https://github.com/digaotech/ml-model-pipeline",
        homepage: null,
        language: "Python",
        stargazers_count: 24,
        forks_count: 6,
        updated_at: "2023-12-28T13:20:00Z",
        topics: ["machine-learning", "tensorflow", "data-analysis", "pipeline"],
        private: false
      }
    ];
  }

  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-400',
      Python: 'bg-green-400',
      Java: 'bg-red-400',
      'C#': 'bg-purple-400',
      PHP: 'bg-indigo-400',
      Go: 'bg-cyan-400',
      Rust: 'bg-orange-400',
      Swift: 'bg-orange-500',
      Kotlin: 'bg-purple-500',
    };
    return colors[language] || 'bg-gray-400';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

export const githubApi = new GitHubApiService();
