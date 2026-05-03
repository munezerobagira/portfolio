import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import { getAllPosts, getPostBySlug } from "@/utils/vault";

// next-mdx-remote v6 MDXRemote is an async React Server Component.
// TypeScript does not yet model async RSCs in JSX (return type is
// Promise<ReactElement> rather than ReactElement). Casting to a sync
// FC is intentional and safe — the component is server-only.
// Tracked upstream: https://github.com/hashicorp/next-mdx-remote/issues/430
const MDXContent = MDXRemote as unknown as (props: {
  source: string;
}) => ReactElement;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | The Vault · MBAGS`,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Architecture: "#055a21",
  "Security Operations": "#FF003C",
  "Product Strategy": "#a78bfa",
};

export default async function VaultPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const catColor = CATEGORY_COLORS[post.category] ?? "#ffffff";

  return (
    <div className="relative min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/vault"
          className="font-mono text-xs uppercase tracking-widest text-white/30 hover:text-[#00ff55] transition-colors duration-200 flex items-center gap-2 mb-12"
        >
          ← Back to Vault
        </Link>

        {/* Post header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: catColor }}
            >
              {post.category}
            </span>
            <span className="text-white/20">·</span>
            <span className="font-mono text-[10px] text-white/30">
              {post.readingTime} min read
            </span>
            <span className="text-white/20">·</span>
            <span className="font-mono text-[10px] text-white/30">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          <p className="font-prose text-white/55 text-lg leading-relaxed">
            {post.excerpt}
          </p>

          {/* Separator */}
          <div
            className="mt-8"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* MDX content */}
        <article className="vault-prose">
          <MDXContent source={post.content} />
        </article>

        {/* Footer */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/vault"
            className="font-mono text-xs uppercase tracking-widest text-white/30 hover:text-[#00ff55] transition-colors duration-200 flex items-center gap-2"
          >
            ← Back to Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
