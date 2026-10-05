export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  responsibilities?: string[];
  technologies?: string[];
  projects?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer",
    company: "Freecharge Payment Technologies, IN",
    dates: "Aug 2024 - Present",
    responsibilities: [
      "Build and maintain reliable payment systems processing high transaction volumes with 99.99% uptime.",
      "Design fast event pipelines with Kafka and Redis for real-time settlements and ledger balance updates.",
      "Speed up payment APIs by 35% through smart PostgreSQL database indexing and Redis caching tiers.",
      "Partner with product and security teams to stop fraud in real-time without slowing down user checkout.",
    ],
    technologies: ["Java", "Spring Boot", "TypeScript", "Node.js", "Kafka", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    projects: [
      "Payment Gateway Core Engine",
      "Real-time Settlement & Reconciliation Service",
      "Merchant Webhook Dispatcher",
    ],
  },
  {
    role: "Backend Developer",
    company: "Quantum Dynamics Corp., FR",
    dates: "Mar 2023 - Jun 2024",
    responsibilities: [
      "Built clean, high-performance RESTful and GraphQL APIs for enterprise client applications.",
      "Migrated databases, improved table structures, and added indexes to make slow queries run fast.",
      "Wrote comprehensive automated test suites, lifting test coverage from 45% to over 85%.",
      "Containerized microservices with Docker and set up automated CI/CD pipelines on Google Cloud.",
    ],
    technologies: ["Python", "FastAPI", "Node.js", "PostgreSQL", "GraphQL", "Docker", "GCP", "Redis", "CI/CD"],
    projects: [
      "Enterprise Data Ingestion API",
      "Automated Role-Based Access Control (RBAC) Module",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Innovation Incubator Advisory, IN",
    dates: "Nov 2022 - Mar 2023",
    responsibilities: [
      "Turned startup ideas and design mockups into working, responsive web applications.",
      "Built modern dashboards with React and Tailwind CSS, integrating live payments and analytics.",
      "Assisted senior engineers with relational database design and API testing before public launches.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    projects: ["Startup Incubation Portal", "Portfolio Venture Analytics Dashboard"],
  },
  {
    role: "Software Developer Intern",
    company: "Full Creative, IN",
    dates: "Sep 2022 - Oct 2022",
    responsibilities: [
      "Created reusable UI components following accessible design system guidelines.",
      "Found and fixed frontend performance bottlenecks to make pages load and respond smoothly.",
      "Participated in agile sprints, code reviews, and pair programming sessions with senior engineers.",
    ],
    technologies: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Git", "Jest"],
    projects: ["Internal Collaboration Tools", "Reusable Design System Components"],
  },
];

export interface EducationEntry {
  degree: string;
  institution: string;
  dates: string;
  cgpa: string;
  coursework: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University, IN",
    dates: "2024 - 2026",
    cgpa: "8.95/10",
    coursework: [
      "Machine Learning in Python",
      "Deep Learning and NLP",
      "Statistics and Data Science",
      "Business Applications of AI",
      "Advanced Database Systems",
      "Design and Analysis of Algorithms",
      "Web Applications Development",
      "Cloud Computing and Analytics",
      "Cybersecurity and Cryptography",
      "Software Testing and Quality",
    ],
  },
];
