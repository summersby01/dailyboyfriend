import { forwardRef } from "react";
import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/game/ResultCard";
import { ShareActions } from "@/components/game/ShareActions";
import type { Idol } from "@/types/idol";

const floatingHearts = [
  { left: "8%", top: "12%", size: "text-xl", delay: "0s", duration: "6.4s" },
  { left: "78%", top: "10%", size: "text-2xl", delay: "1.1s", duration: "7.2s" },
  { left: "14%", top: "48%", size: "text-base", delay: "0.8s", duration: "5.8s" },
  { left: "84%", top: "38%", size: "text-lg", delay: "1.7s", duration: "6.8s" },
  { left: "18%", top: "78%", size: "text-xl", delay: "0.3s", duration: "7.6s" },
  { left: "72%", top: "74%", size: "text-sm", delay: "1.4s", duration: "5.9s" },
  { left: "48%", top: "18%", size: "text-lg", delay: "2.2s", duration: "6.1s" },
  { left: "56%", top: "86%", size: "text-xl", delay: "0.9s", duration: "7.1s" },
];

type ResultScreenProps = {
  idol: Idol;
  feedback: string | null;
  isSaving: boolean;
  onSave: () => void;
  onTwitterShare: () => void;
  onFacebookShare: () => void;
  onCopyLink: () => void;
  isShareBusy: boolean;
  onRestart: () => void;
};

export const ResultScreen = forwardRef<HTMLDivElement, ResultScreenProps>(
  function ResultScreen(
    {
      idol,
      feedback,
      isSaving,
      onSave,
      onTwitterShare,
      onFacebookShare,
      onCopyLink,
      isShareBusy,
      onRestart,
    },
    ref,
  ) {
    return (
      <section className="relative overflow-hidden rounded-[32px] bg-white/76 px-5 py-5 shadow-card backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {floatingHearts.map((heart, index) => (
            <span
              key={`${heart.left}-${heart.top}-${index}`}
              aria-hidden="true"
              className={`floating-heart absolute ${heart.size} text-[#f4cfd9]`}
              style={{
                left: heart.left,
                top: heart.top,
                animationDelay: heart.delay,
                animationDuration: heart.duration,
              }}
            >
              ♥
            </span>
          ))}
        </div>
        <div className="relative mb-5 text-center">
          <h2 className="font-display text-[2rem] font-black tracking-[-0.04em] text-ink">
            Boyfriend of the Day
          </h2>
        </div>
        <div ref={ref} className="relative">
          <ResultCard idol={idol} />
        </div>
        <div className="relative mt-5 flex flex-col gap-3">
          <Button aria-label="Save result card" disabled={isSaving} onClick={onSave}>
            {isSaving ? "Saving..." : "Save Photo"}
          </Button>
          <ShareActions
            isBusy={isShareBusy}
            onCopyLink={onCopyLink}
            onFacebookShare={onFacebookShare}
            onTwitterShare={onTwitterShare}
          />
          <Button aria-label="Play again" onClick={onRestart} tone="ghost">
            Play Again
          </Button>
        </div>
        {feedback ? (
          <p className="relative mt-4 text-center text-sm font-medium leading-6 text-berry">
            {feedback}
          </p>
        ) : null}
      </section>
    );
  },
);
