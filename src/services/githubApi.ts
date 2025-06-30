
const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
  open_issues_count: number;
  default_branch: string;
  visibility: 'public' | 'private';
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

class GitHubApiService {
  private baseUrl = GITHUB_API_BASE;
  private username = 'digaotech';

  async fetchUserRepos(username: string = this.username): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users/${username}/repos?type=public&sort=updated&per_page=50`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Filter out forked repos and sort by stars
      return repos
        .filter(repo => !repo.name.includes('fork'))
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 12); // Limit to 12 most starred repos

    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return this.getFallbackRepos();
    }
  }

  async fetchUserProfile(username: string = this.username): Promise<GitHubUser | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      return null;
    }
  }

  async fetchRepoLanguages(username: string, repoName: string): Promise<Record<string, number>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${username}/${repoName}/languages`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching repo languages:', error);
      return {};
    }
  }

  private getFallbackRepos(): GitHubRepo[] {
    return [
      {
        id: 1,
        name: 'digaotech-portfolio',
        full_name: 'digaotech/portfolio',
        description: 'Website moderno e responsivo desenvolvido com React e TypeScript',
        html_url: 'https://github.com/digaotech/portfolio',
        homepage: 'https://digaotech.com',
        stargazers_count: 45,
        forks_count: 12,
        language: 'TypeScript',
        topics: ['react', 'typescript', 'tailwind', 'portfolio'],
        updated_at: '2024-01-15T10:00:00Z',
        created_at: '2023-12-01T10:00:00Z',
        size: 2048,
        open_issues_count: 2,
        default_branch: 'main',
        visibility: 'public'
      },
      {
        id: 2,
        name: 'automation-suite',
        full_name: 'digaotech/automation-suite',
        description: 'Suite completa de ferramentas para automação de processos empresariais',
        html_url: 'https://github.com/digaotech/automation-suite',
        homepage: null,
        stargazers_count: 78,
        forks_count: 23,
        language: 'Python',
        topics: ['python', 'automation', 'rpa', 'selenium'],
        updated_at: '2024-01-20T14:30:00Z',
        created_at: '2023-11-15T09:00:00Z',
        size: 3584,
        open_issues_count: 5,
        default_branch: 'main',
        visibility: 'public'
      },
      {
        id: 3,
        name: 'api-gateway-microservices',
        full_name: 'digaotech/api-gateway',
        description: 'Gateway de APIs com autenticação, rate limiting e monitoramento',
        html_url: 'https://github.com/digaotech/api-gateway',
        homepage: 'https://api.digaotech.com',
        stargazers_count: 92,
        forks_count: 31,
        language: 'Node.js',
        topics: ['nodejs', 'microservices', 'api-gateway', 'docker'],
        updated_at: '2024-01-25T11:45:00Z',
        created_at: '2023-10-20T16:20:00Z',
        size: 4096,
        open_issues_count: 3,
        default_branch: 'main',
        visibility: 'public'
      },
      {
        id: 4,
        name: 'react-ai-chatbot',
        full_name: 'digaotech/react-ai-chatbot',
        description: 'Chatbot inteligente com IA para atendimento automatizado',
        html_url: 'https://github.com/digaotech/react-ai-chatbot',
        homepage: null,
        stargazers_count: 156,
        forks_count: 47,
        language: 'JavaScript',
        topics: ['react', 'ai', 'chatbot', 'openai'],
        updated_at: '2024-01-28T08:15:00Z',
        created_at: '2023-09-10T14:30:00Z',
        size: 2560,
        open_issues_count: 8,
        default_branch: 'main',
        visibility: 'public'
      },
      {
        id: 5,
        name: 'flutter-ecommerce-app',
        full_name: 'digaotech/flutter-ecommerce',
        description: 'App mobile de e-commerce com Flutter e Firebase',
        html_url: 'https://github.com/digaotech/flutter-ecommerce',
        homepage: null,
        stargazers_count: 203,
        forks_count: 68,
        language: 'Dart',
        topics: ['flutter', 'firebase', 'ecommerce', 'mobile'],
        updated_at: '2024-01-30T19:20:00Z',
        created_at: '2023-08-05T11:15:00Z',
        size: 5120,
        open_issues_count: 12,
        default_branch: 'main',
        visibility: 'public'
      },
      {
        id: 6,
        name: 'devops-kubernetes-setup',
        full_name: 'digaotech/k8s-setup',
        description: 'Configuração completa de ambiente Kubernetes para produção',
        html_url: 'https://github.com/digaotech/k8s-setup',
        homepage: null,
        stargazers_count: 134,
        forks_count: 42,
        language: 'Shell',
        topics: ['kubernetes', 'devops', 'docker', 'helm'],
        updated_at: '2024-01-22T13:10:00Z',
        created_at: '2023-07-18T10:45:00Z',
        size: 1024,
        open_issues_count: 4,
        default_branch: 'main',
        visibility: 'public'
      }
    ];
  }

  getLanguageColor(language: string | null): string {
    if (!language) return 'bg-gray-500';
    
    const colors: Record<string, string> = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Node.js': 'bg-green-600',
      'React': 'bg-cyan-500',
      'Vue.js': 'bg-emerald-500',
      'Dart': 'bg-blue-400',
      'Shell': 'bg-gray-600',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-purple-500',
      'Java': 'bg-red-500',
      'C#': 'bg-purple-600',
      'PHP': 'bg-indigo-500',
      'Go': 'bg-cyan-600',
      'Rust': 'bg-orange-600'
    };
    
    return colors[language] || 'bg-gray-500';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

export const githubApi = new GitHubApiService();
