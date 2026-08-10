/**
 * Emits a JSON-LD script tag. `JSON.stringify` output is escaped so a `</script>`
 * sequence inside content can't break out of the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data has to be inlined; the payload is escaped below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
