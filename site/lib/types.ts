import type { I18nText } from "./i18n-utils";

export type LocalizedText = string | I18nText;

export type ProjectStatus = "PoC" | "Production" | "Release";
export type ProjectDirection =
  | "Risk"
  | "Credit Scoring"
  | "Automation"
  | "NLP / Chatbots"
  | "Computer Vision";

export type Project = {
  id: string;
  name: LocalizedText;
  short: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  technologies: string[];
  impact: { label: string; value: string }[];
  team: string[];
  direction: ProjectDirection;
  status: ProjectStatus;
};

export type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  skills: string[];
  photo: string;
  experienceYears?: number;
  about?: LocalizedText;
  achievements?: LocalizedText;
  projects: string[];
};

export type NewsItem = {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body?: LocalizedText;
  date: string;
  category: "Update" | "Insight" | "Announcement";
  image: string;
};

export type EventItem = {
  id: string;
  name: LocalizedText;
  date: string;
  place: LocalizedText;
  participants: LocalizedText;
  image: string;
  gallery: string[];
};

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "internship"
  | "contract";

export type Vacancy = {
  id: string;
  title: LocalizedText;
  location: LocalizedText;
  type: EmploymentType;
  icon?: string;
  description: LocalizedText;
  responsibilities?: LocalizedText;
  requirements?: LocalizedText;
  offer?: LocalizedText;
};
