const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Get token from localStorage
const getToken = () => localStorage.getItem('admin_token');

// Generic fetch with auth
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

// Auth
export const adminAuth = {
  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Login failed: ${response.status}`);
      }
      return response.json();
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Cannot connect to backend. Please make sure the server is running on port 8000.');
      }
      throw err;
    }
  },
};

// CV
export const adminCV = {
  updatePersonalInfo: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/personal-info`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  createEducation: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/education`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  updateEducation: (id: number, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  deleteEducation: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/education/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
  
  createSkill: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/skills`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  deleteSkill: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/cv/skills/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

// Experiences
export const adminExperiences = {
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/experiences`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  update: (id: number, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  delete: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/experiences/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

// Projects
export const adminProjects = {
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  update: (id: number, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  delete: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/projects/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

// Certificates
export const adminCertificates = {
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/certificates`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  update: (id: number, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  delete: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/certificates/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

// Blog
export const adminBlog = {
  create: (data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/blog`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  update: (id: number, data: any) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
  
  delete: (id: number) =>
    fetchWithAuth(`${API_BASE_URL}/api/admin/blog/${id}`, {
      method: 'DELETE',
    }).then(r => r.json()),
};

// Upload
export const adminUpload = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Upload failed: ${response.status}`);
    }
    
    const data = await response.json();
    // Convert relative URL to full URL
    if (data.url && data.url.startsWith('/')) {
      data.url = `${API_BASE_URL}${data.url}`;
    }
    return data;
  },
};
