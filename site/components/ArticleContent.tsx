import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders an article body as Markdown — so content pasted from Claude
 * (## headings, **bold**, - / 1. lists, links, tables) renders exactly
 * as it looked there. Telegram-style "▪️" bullets and "emoji … :" section
 * headers are normalized to Markdown first so they format too.
 */

const UNICODE_BULLETS = "▪▫►◦‣•‧∙●■◆▶";
const LINE_BULLET = new RegExp(
  `^(\\s*)[${UNICODE_BULLETS}][\\uFE0E\\uFE0F]?\\s+`
);
const INLINE_BULLET = new RegExp(
  `\\s*[${UNICODE_BULLETS}][\\uFE0E\\uFE0F]?\\s+`,
  "g"
);
const EMOJI_HEADING = /^(\p{Extended_Pictographic}.*?)[:：]\s*$/u;

/** Convert Telegram-style markers to Markdown the renderer understands. */
function toMarkdown(raw: string): string {
  return raw
    .replace(/\r\n?/g, "\n")
    // inline bullets packed on one line -> each on its own list line
    .replace(INLINE_BULLET, "\n- ")
    .split("\n")
    .map((line) => {
      if (LINE_BULLET.test(line)) return line.replace(LINE_BULLET, "$1- ");
      const heading = line.match(EMOJI_HEADING);
      if (heading && line.length <= 100) return `### ${heading[1].trim()}`;
      return line;
    })
    .join("\n");
}

const components = {
  h1: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="h-display mt-9 mb-3 text-2xl font-semibold leading-snug text-black/90 first:mt-0 md:text-3xl"
      {...p}
    />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="h-display mt-9 mb-3 text-xl font-semibold leading-snug text-black/90 first:mt-0 md:text-2xl"
      {...p}
    />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="h-display mt-7 mb-2 text-lg font-semibold leading-snug text-black/90 first:mt-0 md:text-xl"
      {...p}
    />
  ),
  h4: (p: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-black/90" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 first:mt-0" {...p} />
  ),
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 marker:text-violet-500"
      {...p}
    />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-violet-500"
      {...p}
    />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1.5 leading-relaxed" {...p} />
  ),
  strong: (p: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-black/90" {...p} />
  ),
  a: ({ href, ...rest }: ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
      {...rest}
    />
  ),
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-5 border-l-4 border-violet-400/50 pl-4 italic text-black/65"
      {...p}
    />
  ),
  hr: () => <hr className="my-8 border-black/10" />,
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[0.9em] text-black/80"
      {...p}
    />
  ),
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...p} />
    </div>
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => (
    <th className="border border-black/10 bg-black/[0.04] px-3 py-2 font-semibold" {...p} />
  ),
  td: (p: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-black/10 px-3 py-2" {...p} />
  ),
};

const DEFAULT_CONTAINER =
  "mx-auto mt-12 max-w-3xl text-base leading-[1.75] text-black/75 md:text-lg md:leading-[1.8]";

export function ArticleContent({
  body,
  fallback,
  className = DEFAULT_CONTAINER,
}: {
  body: string;
  fallback: string[];
  className?: string;
}) {
  const source = body.trim();

  if (!source) {
    return (
      <div className={className}>
        {fallback.map((p, i) => (
          <p key={i} className="my-4 first:mt-0">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {toMarkdown(source)}
      </ReactMarkdown>
    </div>
  );
}
