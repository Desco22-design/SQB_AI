/** Name of the hidden anti-bot field rendered in the public forms. */
export const HONEYPOT_NAME = "hp_note";

/**
 * Read the honeypot, but only trust a value the user could actually have typed.
 *
 * The field is `display: none`, so a human can never put anything in it. If it
 * comes back non-empty in a real browser, the browser filled it - Chrome autofill
 * did exactly that (with the user's organisation) and the server then took real
 * applicants for bots and dropped their signup with no error they could act on.
 *
 * So: if the field is not rendered, whatever is in it is not from the user, and
 * we send nothing. A scraper that replays the form outside a browser still POSTs
 * the field filled and is still caught server-side - which is the only traffic
 * the honeypot was ever meant to catch.
 */
export function readHoneypot(form: HTMLFormElement): string {
  const el = form.elements.namedItem(HONEYPOT_NAME);
  if (!(el instanceof HTMLInputElement)) return "";
  // offsetParent is null for a display:none element - i.e. the user never saw it.
  if (el.offsetParent === null) return "";
  return el.value;
}
