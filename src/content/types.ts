export interface Job {
  years: string;
  company: string;
  url: string;
  logo: string;
  role: string;
  description: string;
  margin?: string;
  side?: "right";
  offset?: number;
}

export interface School {
  years: string;
  school: string;
  url: string;
  degree: string;
  side?: "right";
  offset?: number;
  color?: "secondary";
}

export interface Skill {
  name: string;
  iconClass: string;
  description: string;
}

export interface ProjectSummary {
  id: string;
  img: string;
  title: string;
  tags?: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  "private-github"?: string;
  demo_tbd?: string;
  old_demo?: string;
}
