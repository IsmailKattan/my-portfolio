const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types matching backend schemas
export interface PersonalInfo {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface CVData {
  personal_info: PersonalInfo | null;
  education: Education[];
  skills: Skill[];
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
  content_language: string;
}

export interface Project {
  id: number;
  name: string;
  cover_image: string | null;
  description: string;
  category: string;
  tags: string[];
  demo_url: string | null;
  repo_url: string | null;
  content_language: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credential_url: string | null;
  parent_id: number | null;
  sub_certificates: Certificate[];
  content_language: string;
}

export interface BlogPost {
  id: number;
  name: string;
  slug: string;
  cover_image: string | null;
  description: string;
  category: string;
  tags: string | null;
  author: string;
  published_date: string;
  content: string;
  content_language: string;
}

// API client
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new APIError(response.status, `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export const api = {
  // CV
  getCV: () => fetchJSON<CVData>(`${API_BASE_URL}/api/cv`),
  
  // Experiences
  getExperiences: (lang?: string) =>
    fetchJSON<Experience[]>(`${API_BASE_URL}/api/experiences${lang ? `?lang=${lang}` : ''}`),
  
  // Projects
  getProjects: (lang?: string) =>
    fetchJSON<Project[]>(`${API_BASE_URL}/api/projects${lang ? `?lang=${lang}` : ''}`),
  getProject: (id: number) => fetchJSON<Project>(`${API_BASE_URL}/api/projects/${id}`),
  
  // Certificates
  getCertificates: () => fetchJSON<Certificate[]>(`${API_BASE_URL}/api/certificates`),
  
  // Blog
  getBlogPosts: (lang?: string) =>
    fetchJSON<BlogPost[]>(`${API_BASE_URL}/api/blog${lang ? `?lang=${lang}` : ''}`),
  getBlogPost: (slug: string) => fetchJSON<BlogPost>(`${API_BASE_URL}/api/blog/${slug}`),
};

export { APIError };
