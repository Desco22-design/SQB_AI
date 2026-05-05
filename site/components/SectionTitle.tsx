"use client";

export function SectionTitle({
  prefix,
  highlight,
  suffix,
}: {
  prefix: string;
  highlight: string;
  suffix: string;
}) {
  const needsSpaceA =
    prefix.length > 0 &&
    highlight.length > 0 &&
    !/\s$/.test(prefix) &&
    !/^\s/.test(highlight);
  const needsSpaceB =
    highlight.length > 0 &&
    suffix.length > 0 &&
    !/\s$/.test(highlight) &&
    !/^\s/.test(suffix);
  return (
    <>
      {prefix}
      {needsSpaceA && " "}
      {highlight && <span className="gradient-text-violet">{highlight}</span>}
      {needsSpaceB && " "}
      {suffix}
    </>
  );
}
