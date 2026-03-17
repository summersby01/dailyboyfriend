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
import { en, type Language } from "../../../lib/i18n/en";
import { es } from "../../../lib/i18n/es";
import { ja } from "../../../lib/i18n/ja";
import { ko } from "../../../lib/i18n/ko";
import {
  detectBrowserLanguage,
  languageOptions,
  parseStoredLanguage,
} from "../../../lib/i18n/utils";

const ROLL_INTERVAL_MS = 110;
const LANGUAGE_STORAGE_KEY = "dailyboyfriend-language";

export function GameShell() {
  const [lang, setLang] = useState<Language>("en");
  const [hasInitializedLanguage, setHasInitializedLanguage] = useState(false);
  const t = lang === "ko" ? ko : lang === "es" ? es : lang === "ja" ? ja : en;
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

  useEffect(() => {
    const storedLanguage = parseStoredLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
    const initialLanguage = storedLanguage ?? detectBrowserLanguage();
    setLang(initialLanguage);
    setHasInitializedLanguage(true);
  }, []);

  useEffect(() => {
    if (!hasInitializedLanguage) {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, [hasInitializedLanguage, lang]);

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
      setFeedback(t.saveSuccess);
    } catch {
      setFeedback(t.saveError);
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
      title: t.shareTitle,
      text: t.shareText,
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
      setFeedback(result === "redirected" ? t.twitterRedirected : t.twitterOpened);
    } catch {
      setFeedback(t.shareError);
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
      setFeedback(result === "redirected" ? t.facebookRedirected : t.facebookOpened);
    } catch {
      setFeedback(t.shareError);
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
      setFeedback(t.copySuccess);
    } catch {
      setFeedback(t.copyError);
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
            message={t.noData}
            action={
              <Button
                aria-label={t.retryAria}
                fullWidth={false}
                onClick={() => window.location.reload()}
              >
                {t.retry}
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
        <div className="mb-4 flex justify-end">
          <label className="flex min-w-[168px] flex-col gap-1 text-sm font-semibold text-berry">
            <span>{t.language}</span>
            <select
              aria-label={t.languageMenuAria}
              className="min-h-11 rounded-2xl border border-rose/70 bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-card outline-none transition focus:border-blush"
              value={lang}
              onChange={(event) => setLang(event.target.value as Language)}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {phase === "home" ? <HomeScreen disabled={idols.length === 0} onStart={handleStart} t={t} /> : null}
        {phase === "rolling" && currentIdol ? (
          <RollingScreen currentIdol={currentIdol} onStop={handleStop} t={t} />
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
            t={t}
          />
        ) : null}
      </div>
    </main>
  );
}
