//Reviewed

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
      "Design and maintain core payment processing microservices ensuring 99.99% transaction reliability and idempotency across high-volume merchant flows.",
      "Architect asynchronous event-driven pipelines using Kafka and Redis to decouple settlement, reconciliation, and ledger operations under peak throughput.",
      "Optimize distributed database queries and caching layers in PostgreSQL and Redis, cutting P99 latency by over 35% on critical payment APIs.",
      "Collaborate with product managers and risk teams to implement real-time fraud mitigation checks without introducing friction to the checkout flow.",
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
      "Engineered resilient RESTful and GraphQL APIs for client enterprise applications, standardizing contract schemas and validation pipelines.",
      "Designed and executed database migration strategies, normalizing complex data models and establishing indexing strategies for analytical workloads.",
      "Implemented comprehensive automated testing suites (unit, integration, contract tests), elevating test coverage from 45% to over 85%.",
      "Containerized backend services with Docker and set up CI/CD deployment pipelines on GCP, slashing deployment cycle times in half.",
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
      "Developed end-to-end features for early-stage startup MVPs, turning wireframes and product specs into responsive production web apps.",
      "Built interactive dashboard interfaces with React and Tailwind CSS, integrating with third-party analytics and payment APIs.",
      "Assisted senior engineers with relational database schema design, API endpoint specification, and bug triage during beta launches.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    projects: ["Startup Incubation Portal", "Portfolio Venture Analytics Dashboard"],
  },
  {
    role: "Software Developer Intern",
    company: "Full Creative, IN",
    dates: "Sep 2022 - Oct 2022",
    responsibilities: [
      "Contributed to modular UI component libraries adhering to accessibility and design system standards across team products.",
      "Investigated and resolved frontend state synchronization bottlenecks, enhancing page render performance and user experience.",
      "Participated in daily standups, sprint reviews, and pair programming sessions with senior software engineers.",
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
    degree: "Master of Computer Applications",
    institution: "Chandigarh University, IN",
    dates: "2024 - 2026",
    cgpa: "8.95/10",
    coursework: [
      "Machine Learning in Python",
      "Deep Learning and NLP",
      "Statistics and Python in Machine Learning",
      "Business Application of Machine Learning",
      "Web, Social Analytics and Visualization",
      "Advanced Database Management System",
      "Design and Analysis of Algorithms",
      "Python Programming",
      "Advanced Internet Programming",
      "Web Application Development",
      "Big Data Hadoop",
      "IoT, Cloud and Watson Analytics",
      "Cyber Security",
      "Network Security and Cryptography",
      "Software Testing",
    ],
  },
];
