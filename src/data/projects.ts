export type Project = {
  name: string;
  description: string;
  category: string;
  technologies: string[];
  href: string;
};

export const projects: Project[] = [];

export type ProjectCategory = Project["category"];

export const projectCategories: ProjectCategory[] = [
  ...new Set(projects.map((project) => project.category)),
];

