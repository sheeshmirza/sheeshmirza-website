export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  responsibilities: string[];
  technologies: string[];
  projects?: string[];
}

// Add real roles here in reverse-chronological order.
export const experience: ExperienceEntry[] = [
  {
    role: "Lead Software Engineer",
    company: "TechStartup Inc.",
    dates: "2023 - Present",
    responsibilities: [
      "Architected and built the core platform serving 50K+ users using Next.js and PostgreSQL",
      "Led a team of 3 engineers, mentoring junior developers on system design and best practices",
      "Implemented ML-driven recommendation engine reducing churn by 25%",
      "Owned product strategy for the analytics module, collaborating with stakeholders",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "PostgreSQL",
      "Python",
      "AWS",
    ],
    projects: [
      "Real-time analytics dashboard",
      "Recommendation engine",
      "API rate limiting system",
    ],
  },
  {
    role: "Full Stack Engineer",
    company: "Digital Solutions Ltd.",
    dates: "2021 - 2023",
    responsibilities: [
      "Built customer-facing web applications using React and Node.js serving 100K+ monthly users",
      "Optimized database queries and API performance, reducing load times by 40%",
      "Designed and implemented microservices architecture for better scalability",
      "Mentored 2 junior developers and conducted code reviews",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Docker",
      "GCP",
    ],
    projects: ["E-commerce platform", "Customer dashboard", "Admin portal"],
  },
  {
    role: "Software Engineer",
    company: "StartupXYZ",
    dates: "2020 - 2021",
    responsibilities: [
      "Developed full-stack features for web application from requirements to deployment",
      "Built automated testing suite, improving code coverage from 20% to 80%",
      "Contributed to infrastructure setup and DevOps pipeline improvements",
      "Participated in cross-functional product meetings with design and marketing teams",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Express.js",
      "PostgreSQL",
      "Jest",
      "CI/CD",
    ],
  },
];

export interface EducationEntry {
  degree: string;
  institution: string;
  dates: string;
  cgpa?: string;
  coursework?: string[];
  certifications?: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Chandigarh University, India",
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
