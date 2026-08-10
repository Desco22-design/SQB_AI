import type { ProjectDetail } from "./types";
import { mahalla } from "./mahalla";
import { fleet } from "./fleet";
import { ijro } from "./ijro";
import { ulab } from "./ulab";

export type { ProjectDetail, Tri, DetailSection } from "./types";
export { DETAIL_LABELS } from "./types";
export { getProjectMetrics, type Metric } from "./metrics";

const DETAILS: Record<string, ProjectDetail> = {
  [mahalla.id]: mahalla,
  [fleet.id]: fleet,
  [ijro.id]: ijro,
  [ulab.id]: ulab,
};

/** Rich case-study content for a project, or null if none is written yet. */
export function getProjectDetail(id: string): ProjectDetail | null {
  return DETAILS[id] ?? null;
}
