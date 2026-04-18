"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, Scissors, Sparkles, TrendingUp, Video, Play, CheckCircle2, Loader2, Youtube, Instagram, Twitter, Twitch, MousePointerClick, MessageCircle, Share2, Bookmark, Music } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [heroState, setHeroState] = useState<"idle" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const startInteractiveDemo = () => {
    if (heroState !== "idle") return;
    setHeroState("processing");
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setHeroState("done");
          setTimeout(() => {
            setHeroState("idle");
            setProgress(0);
          }, 3000);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased flex flex-col font-sans overflow-x-hidden">
      
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
        <div className="absolute -top-10 left-[20%] h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[120px] animate-blob" />
        <div className="absolute top-20 right-[15%] h-[35rem] w-[35rem] rounded-full bg-violet-600/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute -top-32 left-[40%] h-[45rem] w-[45rem] rounded-full bg-fuchsia-600/10 blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Public Navbar */}
      <header className="container relative z-20 mx-auto flex h-24 items-center justify-between px-6">
        <Link href="/" className="flex items-center group">
          <div className="font-sans text-2xl font-extrabold tracking-tighter flex items-baseline">
            <span className="text-foreground group-hover:glow-text transition-all duration-300">podcast</span>
            <span className="text-primary mx-1">.</span>
            <span className="text-muted-foreground font-medium tracking-widest uppercase text-xs">clipper</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Button asChild className="rounded-full shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-shadow">
            <Link href="/signup">Start Clipping Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Interactive Split Hero Section */}
        <section className="relative z-10 container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Hero Left: Copy & CTAs */}
            <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start group">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-md mb-8 animate-float">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-foreground/80">AI-Powered Content Repurposing 2.0</span>
              </div>
              
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1]">
                Turn podcasts into <br />
                <span className="glow-text">viral gold.</span>
              </h1>
              
              <p className="mt-8 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Upload your long-form audio or video. Our AI instantly extracts the most engaging moments, adds trending captions, and formats them for TikTok, Reels, and Shorts.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" asChild className="rounded-full h-14 px-8 text-base shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] transition-all">
                  <Link href="/signup">
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground ml-4">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> No credit card
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Mockup */}
            <div className="w-full lg:w-[500px] xl:w-[600px] shrink-0 relative">
              <div className="glass-card rounded-[2rem] p-4 lg:p-6 shadow-2xl border-white/10 overflow-hidden relative group/mockup">
                
                {/* Decorative Browser Chrome */}
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 text-xs text-muted-foreground/50 font-mono">dashboard • clip engine</div>
                </div>

                {/* The Interactive Zone */}
                <div 
                  onClick={startInteractiveDemo}
                  className={`relative aspect-[4/3] rounded-2xl border border-white/10 bg-black/40 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col items-center justify-center
                    ${heroState === 'idle' ? 'hover:border-primary/50 hover:bg-black/20' : ''}`}
                >
                  
                  {heroState === "idle" && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                       <div className="bg-primary/20 p-5 rounded-full ring-1 ring-primary/30 mb-6 relative group-hover/mockup:scale-110 transition-transform">
                          <MousePointerClick className="h-10 w-10 text-primary" />
                          <div className="absolute inset-0 rounded-full animate-ping bg-primary/40 opacity-70" />
                       </div>
                       <h3 className="text-xl font-bold font-sans">Click to process podcast</h3>
                       <p className="text-muted-foreground text-sm mt-2 max-w-[250px]">Experience our AI extraction engine in real-time right here.</p>
                     </div>
                  )}

                  {heroState === "processing" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-primary/10 to-transparent">
                      <Loader2 className="h-12 w-12 text-primary animate-spin mb-8" />
                      <div className="w-full max-w-[80%] space-y-2">
                        <div className="flex justify-between text-xs font-mono text-primary font-semibold">
                          <span>ANALYZING AUDIO</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-[40ms] ease-linear" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <div className="mt-8 grid grid-cols-3 gap-2 opacity-30">
                         {/* Fake waveform bars */}
                         {[...Array(6)].map((_, i) => (
                           <div key={i} className="w-6 h-12 bg-white/20 rounded-md animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                         ))}
                      </div>
                    </div>
                  )}

                  {heroState === "done" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-green-500/20 text-green-400 p-4 rounded-full ring-1 ring-green-500/30 mb-4 scale-in-center">
                        <CheckCircle2 className="h-12 w-12" />
                      </div>
                      <h3 className="text-2xl font-bold font-sans text-white">3 Viral Clips Extracted!</h3>
                      <div className="mt-6 flex gap-3">
                         <div className="h-24 w-16 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                           <Play className="h-6 w-6 text-primary" />
                         </div>
                         <div className="h-24 w-16 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform -translate-y-2">
                           <Play className="h-6 w-6 text-primary" />
                         </div>
                         <div className="h-24 w-16 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                           <Play className="h-6 w-6 text-primary" />
                         </div>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
            
          </div>
          
      {/* Logos & Marquee below Hero */}
          <div className="mt-28 overflow-hidden w-full relative pt-10 border-t border-white/5">
            <div className="text-center mb-10"><p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Export directly to</p></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pt-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pt-10"></div>
            <div className="flex w-[200%] animate-marquee opacity-50 hover:opacity-100 transition-opacity duration-500">
              {/* Row 1 */}
              <div className="flex w-1/2 justify-around items-center">
                <div className="flex items-center gap-3"><Youtube className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">YOUTUBE</span></div>
                <div className="flex items-center gap-3">
                  <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.34 6.34 0 0 0 6.25-6.36v-6.07c1.3.89 2.88 1.43 4.58 1.54v-3.43a8.16 8.16 0 0 0-2.51-.93Z"/></svg>
                  <span className="font-sans text-2xl font-bold tracking-widest-xs">TIKTOK</span>
                </div>
                <div className="flex items-center gap-3"><Instagram className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">INSTAGRAM</span></div>
                <div className="flex items-center gap-3"><Twitter className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">X</span></div>
                <div className="flex items-center gap-3"><Twitch className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">TWITCH</span></div>
              </div>
              {/* Row 2 (Duplicated for scrolling loop) */}
              <div className="flex w-1/2 justify-around items-center">
                <div className="flex items-center gap-3"><Youtube className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">YOUTUBE</span></div>
                <div className="flex items-center gap-3">
                  <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.34 6.34 0 0 0 6.25-6.36v-6.07c1.3.89 2.88 1.43 4.58 1.54v-3.43a8.16 8.16 0 0 0-2.51-.93Z"/></svg>
                  <span className="font-sans text-2xl font-bold tracking-widest-xs">TIKTOK</span>
                </div>
                <div className="flex items-center gap-3"><Instagram className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">INSTAGRAM</span></div>
                <div className="flex items-center gap-3"><Twitter className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">X</span></div>
                <div className="flex items-center gap-3"><Twitch className="h-8 w-8"/> <span className="font-sans text-2xl font-bold tracking-widest-xs">TWITCH</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Prop Graphic / Bento Grid */}
        <section className="relative z-10 w-full bg-black/40 border-y border-white/5 backdrop-blur-3xl py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Everything you need to <span className="text-primary">scale.</span></h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card group rounded-3xl p-8 flex flex-col gap-4 border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 group-hover:animate-float">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mt-4">Smart Clipping</h3>
                <p className="text-muted-foreground leading-relaxed">Our AI detects high-retention hooks and emotional spikes, automatically slicing out the objectively best moments from hours of footage.</p>
              </div>

              <div className="glass-card group rounded-3xl p-8 flex flex-col gap-4 border border-white/10 hover:border-primary/30 transition-all duration-500 md:-translate-y-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 group-hover:animate-float animation-delay-2000">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mt-4">Auto-Formatting</h3>
                <p className="text-muted-foreground leading-relaxed">Perfectly cropped 9:16 aspect ratios engineered specifically for TikTok, Instagram Reels, and YouTube Shorts. Zero manual editing.</p>
              </div>

              <div className="glass-card group rounded-3xl p-8 flex flex-col gap-4 border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 group-hover:animate-float animation-delay-4000">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mt-4">Viral Captions</h3>
                <p className="text-muted-foreground leading-relaxed">Dynamic, color-coded, animated typography built right in. Keep viewers glued to the screen with highly readable visual hooks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="relative z-10 py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Three steps to <br/>endless content.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)]">1</div>
                    <div className="h-full w-px bg-white/10 my-2"></div>
                  </div>
                  <div className="pb-8">
                    <h4 className="text-xl font-bold">Upload your episode</h4>
                    <p className="text-muted-foreground mt-2">Drop your MP4 file or simply paste a YouTube link. We handle files up to 5GB in pristine quality.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)]">2</div>
                    <div className="h-full w-px bg-white/10 my-2"></div>
                  </div>
                  <div className="pb-8">
                    <h4 className="text-xl font-bold">AI analyzes the audio</h4>
                    <p className="text-muted-foreground mt-2">Grab a coffee. Our engine parses the transcript and context to locate the exact timestamps where pacing and emotion peak.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)]">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Download & Post</h4>
                    <p className="text-muted-foreground mt-2">Receive ready-to-publish short-form videos with burned-in captions. Download directly to your phone or desktop.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="glass-card aspect-[4/5] w-full rounded-[2.5rem] border border-white/10 p-2 relative overflow-hidden flex items-center justify-center shadow-2xl bg-gradient-to-br from-card/80 to-background">
                {/* Simulated Short-form Video UI */}
                <div className="absolute inset-x-8 top-8 bottom-8 rounded-[2rem] border border-white/10 bg-black overflow-hidden flex flex-col group/video cursor-pointer shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                  {/* Video Mock Header */}
                  <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-start justify-between p-6">
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Play className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                  
                  {/* Video Background / Filter */}
                  <div className="flex-1 relative bg-gradient-to-br from-violet-900 via-indigo-950 to-black transition-transform duration-700 group-hover/video:scale-105 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/10 transition-colors duration-500" />
                    
                    <Play className="h-20 w-20 text-white/30 group-hover/video:scale-125 group-hover/video:text-white/60 transition-all duration-500" />
                    
                    {/* Simulated Captions */}
                    <div className="absolute bottom-36 inset-x-4 flex justify-center">
                      <div className="bg-primary/90 text-white font-black text-2xl uppercase tracking-tighter px-5 py-2 skew-y-[-1deg] shadow-[0_10px_30px_rgba(124,58,237,0.5)] group-hover/video:scale-[1.15] group-hover/video:skew-y-[2deg] transition-transform duration-500 backdrop-blur-md border border-white/20 rounded-sm">
                        VIRAL <span className="text-yellow-400">HOOK</span> HERE
                      </div>
                    </div>
                  </div>

                  {/* Realistic Short Form Overlay UI */}
                  <div className="absolute inset-x-0 bottom-0 top-32 pointer-events-none z-10 p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    
                    {/* Right Action Bar */}
                    <div className="absolute right-3.5 bottom-6 flex flex-col items-center gap-5">
                       {/* Profile */}
                       <div className="relative group/prof mt-4 mb-2">
                         <div className="h-[46px] w-[46px] rounded-full bg-gradient-to-tr from-primary to-violet-400 p-[2px] shadow-lg">
                           <div className="h-full w-full rounded-full bg-black/90 border-2 border-transparent flex items-center justify-center">
                             <TrendingUp className="h-5 w-5 text-white" />
                           </div>
                         </div>
                         <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-5 w-5 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-white font-bold text-[10px] scale-90">+</div>
                       </div>
                       
                       {/* Likes */}
                       <div className="flex flex-col items-center gap-1 text-white">
                         <div className="h-[42px] w-[42px] bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 group-hover/video:bg-rose-500/20 transition-colors">
                           <svg className="h-[22px] w-[22px] fill-white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                         </div>
                         <span className="text-[11px] font-bold font-mono tracking-tighter">142K</span>
                       </div>
                       
                       {/* Comments */}
                       <div className="flex flex-col items-center gap-1 text-white">
                         <div className="h-[42px] w-[42px] bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                           <MessageCircle className="h-[22px] w-[22px] fill-white text-white" />
                         </div>
                         <span className="text-[11px] font-bold font-mono tracking-tighter">1,024</span>
                       </div>
                       
                       {/* Bookmark */}
                       <div className="flex flex-col items-center gap-1 text-white">
                         <div className="h-[42px] w-[42px] bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                           <Bookmark className="h-[22px] w-[22px] fill-white text-white" />
                         </div>
                         <span className="text-[11px] font-bold font-mono tracking-tighter">24K</span>
                       </div>
                       
                       {/* Share */}
                       <div className="flex flex-col items-center gap-1 text-white">
                         <div className="h-[42px] w-[42px] bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                           <Share2 className="h-[22px] w-[22px] fill-white text-white" />
                         </div>
                         <span className="text-[11px] font-bold font-mono tracking-tighter">8.9K</span>
                       </div>
                    </div>
                    
                    {/* Bottom Metadata */}
                    <div className="absolute bottom-6 left-5 right-20 flex flex-col gap-2.5">
                      <h4 className="text-white font-bold text-[15px] tracking-tight">@podcast.clipper</h4>
                      <p className="text-white/90 text-[13px] leading-snug drop-shadow-md pr-2">When you finally realize how much time automation saves you entirely! 🤯💻 <span className="font-semibold">#podcast #viral #creator</span></p>
                      
                      {/* Music Bar */}
                      <div className="flex items-center gap-2 mt-1.5 w-fit">
                        <Music className="h-[14px] w-[14px] text-white animate-pulse" />
                        <div className="overflow-hidden w-28 relative">
                           <div className="flex w-[200%] animate-marquee">
                              <span className="whitespace-nowrap text-xs font-medium text-white px-2">Original Sound - Postcast Clipper • </span>
                              <span className="whitespace-nowrap text-xs font-medium text-white px-2">Original Sound - Postcast Clipper • </span>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative z-10 py-32 container mx-auto px-6">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Stop leaving audiences <br/>on the table.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">Join thousands of creators who have put their channel growth on autopilot. Get 5 free clips when you sign up today.</p>
              <Button size="lg" asChild className="rounded-full h-16 px-10 text-lg shadow-[0_0_40px_rgba(124,58,237,0.4)]">
                <Link href="/signup">
                  Create Your Free Account
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-baseline font-sans text-xl font-extrabold tracking-tighter">
            <span className="text-foreground">podcast</span><span className="text-primary mx-1">.</span><span className="text-muted-foreground uppercase text-[10px] tracking-widest">clipper</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Podcast Clipper. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
