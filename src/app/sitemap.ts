import type { MetadataRoute } from "next";
import { ACTIVE_LOCALES, getHospitals } from "@/lib/hospital-portal";
import { getAllPosts } from "@/data/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.timeofpassion.com";

  // 마케팅 인사이트 — on-domain 블로그 글
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/time/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 협력병원 포털 — 노출 locale × 병원 전 조합
  const hospitalEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      ACTIVE_LOCALES.map(async (lang) => {
        const { hospitals } = await getHospitals(lang);
        return [
          {
            url: `${baseUrl}/${lang}/hospitals`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
          ...hospitals.map((h) => ({
            url: `${baseUrl}/${lang}/hospitals/${h.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ];
      }),
    )
  ).flat();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/time`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/time/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    {
      url: `${baseUrl}/time/quote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/people`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/people/wanghong-marketing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/space`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/space/shinan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...hospitalEntries,
  ];
}
