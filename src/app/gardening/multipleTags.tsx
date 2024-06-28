"use client";

import { BarList, type Color } from "@tremor/react";

interface TagCount {
  name: string;
  count: number;
  totalClicks: number;
}

export function MultipleTags({
  videoTags: videos,
  color
}: {
  videoTags: {
    videoId: string | null;
    tags: string[] | null;
    clicks: number | null;
  }[],
  color: Color
}) {
  let allTags: string[] = [];
  videos.map((video) => {
    if (video.tags === null || video.tags.length === 0) return;
    video.tags.map((tag) => {
      allTags.push(tag);
    });
  });

  const tagCountMap: { [key: string]: { count: number; totalClicks: number } } =
    {};

  // Zählen der Vorkommen jedes Tags und Summieren der Klicks
  videos.forEach((video) => {
    if (video.tags === null || video.tags.length === 0) return;
    video.tags.forEach((tag) => {
      if (!tagCountMap[tag]) {
        tagCountMap[tag] = {
          count: 1,
          totalClicks: video.clicks || 0,
        };
        return;
      }
      tagCountMap[tag]!.count++;
      tagCountMap[tag]!.totalClicks += video.clicks || 0;
    });
  });

  // Konvertieren des Zählobjekts in ein Array von Objekten
  const tagCounts: TagCount[] = Object.keys(tagCountMap).map((tag) => ({
    name: tag,
    count: tagCountMap[tag]?.count ?? 0,
    totalClicks: tagCountMap[tag]?.totalClicks ?? 0,
  }));

  const topTags = tagCounts.sort((a, b) => b.count - a.count).splice(0, 10);

  const dataForChart = topTags.map((t) => ({
    name: t.name,
    value: t.count,
  }));

  return (
    <>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>Tagname</span>
        <span>Count</span>
      </p>
      <BarList data={dataForChart} color={color} />
    </>
  );
}
