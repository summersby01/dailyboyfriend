"use client";

import { Button } from "@/components/ui/Button";
import type { I18nMessages } from "../../../lib/i18n/en";

type HomeScreenProps = {
  disabled?: boolean;
  onStart: () => void;
  t: I18nMessages;
};

export function HomeScreen({ disabled = false, onStart, t }: HomeScreenProps) {
  return (
    <section className="relative isolate flex w-full flex-col items-center rounded-[32px] bg-white/72 px-6 py-9 text-center shadow-card backdrop-blur-sm">
      <div className="relative z-10 inline-flex rounded-full bg-rose/70 px-4 py-1 text-sm font-semibold text-berry">
        {t.homeBadge}
      </div>
      <h1 className="relative z-10 mt-5 font-display text-[2.5rem] font-black tracking-[-0.04em] text-ink">
        {t.title}
      </h1>
      <p className="relative z-10 mt-6 text-lg font-semibold leading-8 text-ink">
        {t.homePromptLine1}
        <br />
        {t.homePromptLine2}
      </p>
      <div className="relative z-20 mt-8 w-full pointer-events-auto">
        <Button
          aria-label={t.startAria}
          className="relative z-20 pointer-events-auto touch-manipulation"
          disabled={disabled}
          onClick={onStart}
        >
          {t.start}
        </Button>
      </div>
    </section>
  );
}
