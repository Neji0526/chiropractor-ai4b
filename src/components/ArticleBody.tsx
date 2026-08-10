import type { ContentBlock } from "@/content/types";

/**
 * Renders the simple block content used by blog posts.
 *
 * Blocks are plain data rather than HTML strings on purpose — nothing from the
 * content layer is ever passed to `dangerouslySetInnerHTML`, so a future CMS
 * can't inject markup into the page.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-clinic">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index}>{block.text}</h2>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
