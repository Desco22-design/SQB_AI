import {
  Brain,
  Code2,
  Database,
  Bug,
  ClipboardList,
  LineChart,
  BarChart3,
  Smartphone,
  Search,
  Server,
  Cpu,
  Network,
  PenTool,
  Boxes,
  ShieldCheck,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

// Curated icon set the admin can pick from for each vacancy.
export const VACANCY_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  code: Code2,
  database: Database,
  bug: Bug,
  clipboard: ClipboardList,
  lineChart: LineChart,
  barChart: BarChart3,
  smartphone: Smartphone,
  search: Search,
  server: Server,
  cpu: Cpu,
  network: Network,
  design: PenTool,
  boxes: Boxes,
  shield: ShieldCheck,
  briefcase: Briefcase,
};

export const VACANCY_ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "brain", label: "Brain (ML / AI)" },
  { value: "code", label: "Code (Engineering)" },
  { value: "database", label: "Database (Data)" },
  { value: "bug", label: "Bug (QA)" },
  { value: "clipboard", label: "Clipboard (PM)" },
  { value: "lineChart", label: "Line chart (Analytics)" },
  { value: "barChart", label: "Bar chart (BI)" },
  { value: "smartphone", label: "Smartphone (Mobile)" },
  { value: "search", label: "Search (Research)" },
  { value: "server", label: "Server (Backend)" },
  { value: "cpu", label: "CPU (NLP / LLM)" },
  { value: "network", label: "Network (MLOps)" },
  { value: "design", label: "Pen (Design)" },
  { value: "boxes", label: "Boxes (General)" },
  { value: "shield", label: "Shield (Security)" },
  { value: "briefcase", label: "Briefcase (Default)" },
];

export const getVacancyIcon = (name?: string | null): LucideIcon =>
  (name && VACANCY_ICONS[name]) || Briefcase;
