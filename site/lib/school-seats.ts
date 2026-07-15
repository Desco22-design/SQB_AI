import "server-only";

import { prisma } from "@/lib/prisma";
import { SCHOOL_TOPICS, publicSeats } from "@/lib/school-program";

/** How many pupils signed up for each lesson, keyed by topic id. */
export type SeatCounts = Record<string, number>;

export type TopicSeats = {
  taken: number;
  left: number;
  isFull: boolean;
};

/**
 * Signup count per lesson. Every topic in the schedule is present in the result,
 * including the ones nobody has picked yet, so callers never have to guard for
 * a missing key.
 */
export async function getSeatCounts(): Promise<SeatCounts> {
  const counts: SeatCounts = {};
  for (const topic of SCHOOL_TOPICS) counts[topic.id] = 0;

  try {
    const groups = await prisma.schoolApplication.groupBy({
      by: ["topicId"],
      _count: { _all: true },
    });
    for (const g of groups) {
      // A signup for a topic that was later removed from the schedule is simply
      // ignored here - the seat map only describes lessons we still offer.
      if (g.topicId in counts) counts[g.topicId] = g._count._all;
    }
  } catch {
    // If the DB is unreachable, fall back to "no seats taken" rather than
    // breaking the page: the API still enforces capacity on submit.
  }

  return counts;
}

export function seatsFor(counts: SeatCounts, topicId: string): TopicSeats {
  // Advertised 30-seat view; real intake runs to 45 (see publicSeats).
  const { shownTaken, shownLeft, isFull } = publicSeats(counts[topicId] ?? 0);
  return { taken: shownTaken, left: shownLeft, isFull };
}
