import Link from "next/link";
import { getAllPosts } from "@/utils/vault";

export const metadata = {
  title: "The Vault | MBAGS",
  description:
    "Technical deep-dives on Cloud Architecture, Security Operations, and Product Strategy.",
};

const CATEGORY_COLORS: Record<string, string> = {
  Architecture: "#00F0FF",
  "Security Operations": "#FF003C",
  "Product Strategy": "#a78bfa",
};

export default function VaultPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="relative min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px" style={{ background: "#00F0FF" }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: "#00F0FF" }}
            >
              Intellectual Repository
            </span>
          </div>
          <h1
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            The Vault
          </h1>
          <p className="font-prose text-white/50 max-w-lg">
            Technical depth. Operational honesty. Architecture decisions,
            security battle-notes, and product thinking — written for engineers.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <span
              key={cat}
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5"
              style={{
                border: `1px solid ${CATEGORY_COLORS[cat] ?? "rgba(255,255,255,0.15)"}40`,
                color: CATEGORY_COLORS[cat] ?? "rgba(255,255,255,0.5)",
                background: `${CATEGORY_COLORS[cat] ?? "#ffffff"}08`,
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-px" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {posts.map((post) => {
            const catColor = CATEGORY_COLORS[post.category] ?? "#ffffff";
            return (
              <Link
                key={post.slug}
                href={`/vault/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-4 py-6 px-4 transition-all duration-200 hover:bg-white/[0.02]"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Date + reading time */}
                <div className="flex-shrink-0 w-36">
                  <p className="font-mono text-[11px] text-white/30">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="font-mono text-[10px] text-white/20 mt-0.5">
                    {post.readingTime} min read
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: catColor }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-display font-semibold text-lg text-white group-hover:text-white/90 leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="font-prose text-white/45 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="flex-shrink-0 font-mono text-white/20 group-hover:text-[#00F0FF] transition-colors duration-200"
                  style={{ fontSize: "1.2rem" }}
                >
                  →
                </div>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24">
            <p className="font-mono text-white/30 text-sm">
              {"// No entries yet. Transmissions incoming."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
