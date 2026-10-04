const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const profile = {
  name: 'Habib Al Fauzan',
  role: 'Software Engineer',
  location: 'Jakarta, Indonesia',
  email: 'habibalfauzan1@gmail.com',
  github: 'https://github.com/alfauzan003',
  linkedin: 'https://www.linkedin.com/in/alfauzan003/',
  resume: `${base}/assets/CV_Habib_Al_Fauzan.pdf`,
}

export const skillGroups = [
  { category: 'Languages', skills: ['C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go'] },
  { category: 'Backend', skills: ['.NET / ASP.NET Core', 'Spring Boot', 'FastAPI', 'Express.js', 'Flask'] },
  { category: 'Frontend', skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Databases', skills: ['PostgreSQL', 'SQL Server', 'Oracle Database', 'TimescaleDB', 'Redis'] },
  { category: 'Cloud & DevOps', skills: ['Docker', 'Google Cloud Platform', 'Oracle Cloud', 'GitHub Actions'] },
  { category: 'Manufacturing systems', skills: ['MES integration', 'Equipment Interface (EIF)', 'OPC-UA', 'Solace messaging', 'HMI'] },
]

export const education = {
  degree: 'Bachelor of Information Systems',
  school: 'Universitas Pembangunan Nasional Veteran Yogyakarta',
  period: '2020 – 2024',
  gpa: '3.86 / 4.00',
  coursework: [
    'Web Development',
    'Database Management Systems',
    'Algorithms',
    'Mobile Development',
    'Cloud Technology',
    'Software Development',
    'Software Quality Assurance',
  ],
}

export const certifications = [
  {
    name: 'Oracle Cloud Infrastructure Architect Associate',
    issuer: 'Oracle',
    year: 2026,
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=A6E146ADE27448584D071DFEFF4365D56BFB42713E40F1804ACEF3BC24946D17',
  },
  {
    name: 'REST API (Intermediate)',
    issuer: 'HackerRank',
    year: 2026,
    url: 'https://www.hackerrank.com/certificates/e88215ed1dbc',
  },
  {
    name: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    year: 2026,
    url: 'https://www.hackerrank.com/certificates/80ab1722e2e2',
  },
  {
    name: 'Building with the Claude API',
    issuer: 'Anthropic',
    year: 2026,
    url: 'https://academy.claude.com/verify/f48c9b0be086bd00df34e77b7b07e1c2',
  },
  {
    name: 'Junior Web Developer Certification',
    issuer: 'BNSP',
    year: 2022,
    url: null,
  },
  {
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Google, Coursera',
    year: 2022,
    url: 'https://coursera.org/share/98bb73e4cd6b41e3303b40196114b09b',
  },
]
