"use client";

import { Button } from "@/components/ui/Button";

type HomeScreenProps = {
  disabled?: boolean;
  onStart: () => void;
};

export function HomeScreen({ disabled = false, onStart }: HomeScreenProps) {
  return (
    <section className="relative isolate flex w-full flex-col items-center rounded-[32px] bg-white/72 px-6 py-9 text-center shadow-card backdrop-blur-sm">
      <div className="relative z-10 inline-flex rounded-full bg-rose/70 px-4 py-1 text-sm font-semibold text-berry">
        Daily Meme Game
      </div>
      <h1 className="relative z-10 mt-5 font-display text-[2.5rem] font-black tracking-[-0.04em] text-ink">
        Daily Boyfriend
      </h1>
      <p className="relative z-10 mt-6 text-lg font-semibold leading-8 text-ink">
        Press START
        <br />
        to meet your boyfriend of the day
      </p>
      <div className="relative z-20 mt-8 w-full pointer-events-auto">
        <Button
          aria-label="Start game"
          className="relative z-20 pointer-events-auto touch-manipulation"
          disabled={disabled}
          onClick={onStart}
        >
          START
        </Button>
      </div>
    </section>
  );
}
