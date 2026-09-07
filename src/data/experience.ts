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
    responsibilities: [],
    technologies: [],
    projects: [],
  },
  {
    role: "Backend Developer",
    company: "Quantum Dynamics Corp., FR",
    dates: "Mar 2023 - Jun 2024",
    responsibilities: [],
    technologies: [],
    projects: [],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Innovation Incubator Advisory, IN",
    dates: "Nov 2022 - Mar 2023",
    responsibilities: [],
    technologies: [],
    projects: [],
  },
  {
    role: "Software Developer Intern",
    company: "Full Creative, IN",
    dates: "Sep 2022 - Oct 2022",
    responsibilities: [],
    technologies: [],
    projects: [],
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
