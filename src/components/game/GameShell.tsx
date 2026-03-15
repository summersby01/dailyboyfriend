"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorNotice } from "@/components/ui/ErrorNotice";
import { Button } from "@/components/ui/Button";
import { HomeScreen } from "@/components/game/HomeScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { RollingScreen } from "@/components/game/RollingScreen";
import { idols } from "@/lib/idols";
import { saveElementAsPng } from "@/lib/save-image";
import { copyShareLink, openFacebookShare, openTwitterShare } from "@/lib/share";
import type { GamePhase } from "@/types/idol";

const ROLL_INTERVAL_MS = 110;

export function GameShell() {
  const [phase, setPhase] = useState<GamePhase>("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdolId, setSelectedIdolId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idols.length === 0) {
      return;
    }

    idols.forEach((idol) => {
      const image = new window.Image();
      image.src = idol.image;
    });
  }, []);

  useEffect(() => {
    return () => {
      stopRollingTimer();
    };
  }, []);

  function stopRollingTimer() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function getRandomStartIndex() {
    return Math.floor(Math.random() * idols.length);
  }

  function handleStart() {
    if (idols.length === 0) {
      return;
    }

    const startIndex = getRandomStartIndex();

    stopRollingTimer();
    setFeedback(null);
    setSelectedIdolId(null);
    setCurrentIndex(startIndex);
    setPhase("rolling");

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % idols.length);
    }, ROLL_INTERVAL_MS);
  }

  function handleStop() {
    stopRollingTimer();
    const chosen = idols[currentIndex % idols.length];
    setSelectedIdolId(chosen.id);
    setPhase("result");
    setFeedback(null);
  }

  async function handleSave() {
    if (!resultCardRef.current || !selectedIdol) {
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      await saveElementAsPng(resultCardRef.current, `daily-boyfriend-${selectedIdol.id}.png`);
      setFeedback("Your result card was saved as a PNG.");
    } catch {
      setFeedback("Failed to save the image. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function getSharePayload() {
    if (!selectedIdol) {
      return null;
    }

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : process.env.NEXT_PUBLIC_SITE_URL || "";

    return {
      title: "Daily Boyfriend 💘",
      text: "My daily boyfriend result 💘",
      url: currentUrl,
    };
  }

  function handleTwitterShare() {
    if (!selectedIdol) {
      return;
    }

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      const result = openTwitterShare(sharePayload);
      setFeedback(result === "redirected" ? "Redirecting to X share." : "Opened the X share window.");
    } catch {
      setFeedback("Sharing failed. Please try again.");
    }
  }

  function handleFacebookShare() {
    if (!selectedIdol) {
      return;
    }

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      const result = openFacebookShare(sharePayload);
      setFeedback(result === "redirected" ? "Redirecting to Facebook share." : "Opened the Facebook share window.");
    } catch {
      setFeedback("Sharing failed. Please try again.");
    }
  }

  async function handleCopyLink() {
    if (!selectedIdol) {
      return;
    }

    setFeedback(null);

    try {
      const sharePayload = getSharePayload();

      if (!sharePayload) {
        return;
      }

      await copyShareLink(sharePayload);
      setFeedback("Link copied!");
    } catch {
      setFeedback("Failed to copy the link. Please try again.");
    }
  }

  function handleRestart() {
    stopRollingTimer();
    setPhase("home");
    setSelectedIdolId(null);
    setCurrentIndex(0);
    setFeedback(null);
  }

  if (idols.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px]">
          <ErrorNotice
            message="No idol data is available to display."
            action={
              <Button
                aria-label="Try again"
                fullWidth={false}
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            }
          />
        </div>
      </main>
    );
  }

  const currentIdol = idols[currentIndex % idols.length];
  const selectedIdol = selectedIdolId
    ? idols.find((idol) => idol.id === selectedIdolId) ?? null
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-[430px]">
        {phase === "home" ? <HomeScreen disabled={idols.length === 0} onStart={handleStart} /> : null}
        {phase === "rolling" && currentIdol ? (
          <RollingScreen currentIdol={currentIdol} onStop={handleStop} />
        ) : null}
        {phase === "result" && selectedIdol ? (
          <ResultScreen
            ref={resultCardRef}
            feedback={feedback}
            idol={selectedIdol}
            isSaving={isSaving}
            isShareBusy={false}
            onRestart={handleRestart}
            onSave={handleSave}
            onFacebookShare={handleFacebookShare}
            onTwitterShare={handleTwitterShare}
            onCopyLink={handleCopyLink}
          />
        ) : null}
      </div>
    </main>
  );
}
