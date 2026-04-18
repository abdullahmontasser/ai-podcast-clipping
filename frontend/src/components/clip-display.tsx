"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";

function ClipCard({ clip }: { clip: Clip }) {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clip.id);
        if (result.succes && result.url) {
          setPlayUrl(result.url);
        } else if (result.error) {
          console.error("Failed to get play url: " + result.error);
        }
      } catch {
      } finally {
        setIsLoadingUrl(false);
      }
    }

    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="bg-card/40 backdrop-blur-sm group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
        {isLoadingUrl ? (
          <div className="rounded-full bg-primary/10 p-4 ring-1 ring-primary/20 animate-pulse">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="rounded-full bg-secondary/50 p-4 ring-1 ring-white/10">
            <Play className="text-muted-foreground h-10 w-10 opacity-50" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Button onClick={handleDownload} variant="outline" size="sm" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Clip
        </Button>
      </div>
    </div>
  );
}

export function ClipDisplay({ clips }: { clips: Clip[] }) {
  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-primary/10 p-5 ring-1 ring-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
          <Play className="text-primary h-10 w-10" />
        </div>
        <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">No clips yet</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Upload your first podcast to see the magic happen. Your AI-generated clips will appear here ready for TikTok or Shorts.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
}
