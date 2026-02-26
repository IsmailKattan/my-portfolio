export const cvData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  education: [
    {
      degree: 'Master of Science in Cybersecurity',
      institution: 'Stanford University',
      year: '2018-2020'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'MIT',
      year: '2014-2018'
    }
  ],
  skills: [
    'Penetration Testing',
    'Network Security',
    'Incident Response',
    'SIEM Tools',
    'Python, C++, JavaScript',
    'Ethical Hacking',
    'Threat Intelligence',
    'Cloud Security (AWS, Azure)',
    'Security Auditing',
    'Cryptography'
  ]
};

export const experiencesData = [
  {
    id: 1,
    position: 'Senior Security Analyst',
    company: 'CyberShield Inc.',
    duration: '2021 - Present',
    responsibilities: [
      'Lead security audits and penetration testing',
      'Develop security protocols and policies',
      'Respond to security incidents and breaches',
      'Train team members on security best practices'
    ]
  },
  {
    id: 2,
    position: 'Security Consultant',
    company: 'SecureNet Solutions',
    duration: '2019 - 2021',
    responsibilities: [
      'Conducted vulnerability assessments',
      'Implemented security frameworks',
      'Advised clients on compliance requirements',
      'Performed threat modeling exercises'
    ]
  },
  {
    id: 3,
    position: 'Junior Security Engineer',
    company: 'TechGuard Corp',
    duration: '2018 - 2019',
    responsibilities: [
      'Monitored network traffic for anomalies',
      'Assisted in incident response procedures',
      'Maintained security documentation',
      'Deployed security patches and updates'
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    name: 'SecureWeb Scanner',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    description: 'Advanced web application vulnerability scanner with automated reporting and remediation suggestions.',
    category: 'Security Tools',
    tags: ['Python', 'Web Security', 'Automation'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/secureweb'
  },
  {
    id: 2,
    name: 'Network Monitor Pro',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    description: 'Real-time network traffic analyzer with anomaly detection using machine learning algorithms.',
    category: 'Network Security',
    tags: ['Python', 'ML', 'Networking'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/networkmon'
  },
  {
    id: 3,
    name: 'Phishing Detection System',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    description: 'AI-powered email phishing detection system with 99% accuracy rate.',
    category: 'Threat Detection',
    tags: ['AI', 'Email Security', 'TensorFlow'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/phishing'
  },
  {
    id: 4,
    name: 'Cloud Security Dashboard',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    description: 'Comprehensive cloud infrastructure security monitoring dashboard for AWS and Azure.',
    category: 'Cloud Security',
    tags: ['AWS', 'Azure', 'React', 'API'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/cloud-sec'
  },
  {
    id: 5,
    name: 'Vulnerability Database',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    description: 'Centralized vulnerability tracking and management system with CVE integration.',
    category: 'Security Tools',
    tags: ['Database', 'API', 'CVE'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/vulndb'
  },
  {
    id: 6,
    name: 'Encrypted Chat App',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    description: 'End-to-end encrypted messaging application with zero-knowledge architecture.',
    category: 'Cryptography',
    tags: ['Encryption', 'React Native', 'WebRTC'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/example/encrypted-chat'
  }
];

export const certificatesData = [
  {
    id: 1,
    name: 'Certified Information Systems Security Professional (CISSP)',
    issuer: 'ISC²',
    date: '2022-03-15',
    credentialUrl: 'https://example.com/cert',
    subCertificates: [
      {
        id: 11,
        name: 'CISSP - Security Operations',
        issuer: 'ISC²',
        date: '2022-06-20',
        credentialUrl: 'https://example.com/cert',
        subCertificates: [
          {
            id: 111,
            name: 'Advanced Security Operations Workshop',
            issuer: 'ISC²',
            date: '2022-08-10',
            credentialUrl: 'https://example.com/cert'
          }
        ]
      },
      {
        id: 12,
        name: 'CISSP - Asset Security',
        issuer: 'ISC²',
        date: '2022-07-15',
        credentialUrl: 'https://example.com/cert'
      }
    ]
  },
  {
    id: 2,
    name: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: '2021-11-10',
    credentialUrl: 'https://example.com/cert',
    subCertificates: [
      {
        id: 21,
        name: 'CEH Practical',
        issuer: 'EC-Council',
        date: '2022-01-20',
        credentialUrl: 'https://example.com/cert'
      }
    ]
  },
  {
    id: 3,
    name: 'AWS Certified Security Specialty',
    issuer: 'Amazon Web Services',
    date: '2023-02-28',
    credentialUrl: 'https://example.com/cert'
  },
  {
    id: 4,
    name: 'GIAC Security Essentials (GSEC)',
    issuer: 'SANS Institute',
    date: '2020-09-05',
    credentialUrl: 'https://example.com/cert'
  },
  {
    id: 5,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2019-05-12',
    credentialUrl: 'https://example.com/cert',
    subCertificates: [
      {
        id: 51,
        name: 'CompTIA Network+',
        issuer: 'CompTIA',
        date: '2019-03-01',
        credentialUrl: 'https://example.com/cert'
      }
    ]
  }
];

export const blogData = [
  {
    id: 1,
    name: 'Top 10 Cybersecurity Threats in 2026',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    description: 'An in-depth analysis of the most critical cybersecurity threats facing organizations in 2026 and how to protect against them.',
    category: 'Threat Intelligence',
    tags: ['Threats', 'Analysis', 'Security Trends'],
    author: 'Alex Johnson',
    publishedDate: '2026-01-05',
    content: 'Full article content...'
  },
  {
    id: 2,
    name: 'Zero Trust Architecture: A Complete Guide',
    coverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
    description: 'Learn how to implement zero trust security architecture in your organization for enhanced protection.',
    category: 'Security Architecture',
    tags: ['Zero Trust', 'Architecture', 'Best Practices'],
    author: 'Alex Johnson',
    publishedDate: '2025-12-20',
    content: 'Full article content...'
  },
  {
    id: 3,
    name: 'Securing Cloud Infrastructure: AWS vs Azure',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    description: 'A comprehensive comparison of security features and best practices for AWS and Azure cloud platforms.',
    category: 'Cloud Security',
    tags: ['AWS', 'Azure', 'Cloud', 'Comparison'],
    author: 'Alex Johnson',
    publishedDate: '2025-12-10',
    content: 'Full article content...'
  },
  {
    id: 4,
    name: 'AI in Cybersecurity: Friend or Foe?',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    description: 'Exploring the dual role of artificial intelligence in both defending against and enabling cyber attacks.',
    category: 'AI Security',
    tags: ['AI', 'Machine Learning', 'Threats'],
    author: 'Alex Johnson',
    publishedDate: '2025-11-28',
    content: 'Full article content...'
  },
  {
    id: 5,
    name: 'Incident Response Playbook 2026',
    coverImage: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&h=600&fit=crop',
    description: 'A practical guide to handling security incidents with step-by-step procedures and templates.',
    category: 'Incident Response',
    tags: ['Incident Response', 'Procedures', 'Playbook'],
    author: 'Alex Johnson',
    publishedDate: '2025-11-15',
    content: 'Full article content...'
  },
  {
    id: 6,
    name: 'Ransomware Defense Strategies',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    description: 'Essential strategies and tools to protect your organization from ransomware attacks.',
    category: 'Malware Protection',
    tags: ['Ransomware', 'Defense', 'Protection'],
    author: 'Alex Johnson',
    publishedDate: '2025-11-01',
    content: 'Full article content...'
  }
];
