import { NextResponse } from "next/server";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://portfolio-murtuza-ahmed.vercel.app";

const pages = ["", "about", "projects", "resume", "contact"];

function generateSiteMap() {
  const today = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
      .map((page) => {
        const path = page === "" ? "" : `/${page}`;
        return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
      })
      .join("\n")}
</urlset>`;
}

export function GET() {
  return new NextResponse(generateSiteMap(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
