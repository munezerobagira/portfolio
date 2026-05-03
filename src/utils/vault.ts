import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface VaultPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: number;
  excerpt: string;
  content: string;
}

const VAULT_DIR = path.join(process.cwd(), "src", "content", "vault");

export function getAllPosts(): VaultPost[] {
  if (!fs.existsSync(VAULT_DIR)) return [];
  const files = fs.readdirSync(VAULT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(VAULT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: data.category ?? "Uncategorized",
        readingTime: data.readingTime ?? 5,
        excerpt: data.excerpt ?? "",
        content,
      } as VaultPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): VaultPost | null {
  const filePath = path.join(VAULT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "Uncategorized",
    readingTime: data.readingTime ?? 5,
    excerpt: data.excerpt ?? "",
    content,
  };
}
