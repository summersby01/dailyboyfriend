export type Language = "en" | "ko" | "es" | "ja";

export type I18nMessages = {
  title: string;
  start: string;
  stop: string;
  resultTitle: string;
  save: string;
  shareTwitter: string;
  shareFacebook: string;
  copyLink: string;
  retry: string;
  language: string;
  homeBadge: string;
  homePromptLine1: string;
  homePromptLine2: string;
  rollingPromptLine1: string;
  rollingPromptLine2: string;
  saving: string;
  playAgain: string;
  saveSuccess: string;
  saveError: string;
  shareTitle: string;
  shareText: string;
  twitterRedirected: string;
  twitterOpened: string;
  facebookRedirected: string;
  facebookOpened: string;
  shareError: string;
  copySuccess: string;
  copyError: string;
  noData: string;
  todaysPick: string;
  resultMessage: string;
  startAria: string;
  stopAria: string;
  saveAria: string;
  playAgainAria: string;
  retryAria: string;
  shareOnTwitterAria: string;
  shareOnFacebookAria: string;
  copyLinkAria: string;
  languageMenuAria: string;
  idolPhotoAlt: string;
  idolResultAlt: string;
};

export const en: I18nMessages = {
  title: "Daily Boyfriend",
  start: "START",
  stop: "STOP",
  resultTitle: "Boyfriend of the Day",
  save: "Save Photo",
  shareTwitter: "Twitter",
  shareFacebook: "Facebook",
  copyLink: "Copy Link",
  retry: "Try Again",
  language: "Language",
  homeBadge: "Daily Meme Game",
  homePromptLine1: "Press START",
  homePromptLine2: "to meet your boyfriend of the day",
  rollingPromptLine1: "Press STOP",
  rollingPromptLine2: "to lock in your boyfriend of the day",
  saving: "Saving...",
  playAgain: "Play Again",
  saveSuccess: "Your result card was saved as a PNG.",
  saveError: "Failed to save the image. Please try again.",
  shareTitle: "Daily Boyfriend 💘",
  shareText: "My daily boyfriend result 💘",
  twitterRedirected: "Redirecting to X share.",
  twitterOpened: "Opened the X share window.",
  facebookRedirected: "Redirecting to Facebook share.",
  facebookOpened: "Opened the Facebook share window.",
  shareError: "Sharing failed. Please try again.",
  copySuccess: "Link copied!",
  copyError: "Failed to copy the link. Please try again.",
  noData: "No idol data is available to display.",
  todaysPick: "TODAY'S PICK",
  resultMessage: "It's {name} 💘",
  startAria: "Start game",
  stopAria: "Stop on the current idol",
  saveAria: "Save result card",
  playAgainAria: "Play again",
  retryAria: "Try again",
  shareOnTwitterAria: "Share on Twitter",
  shareOnFacebookAria: "Share on Facebook",
  copyLinkAria: "Copy link",
  languageMenuAria: "Select language",
  idolPhotoAlt: "{name} photo",
  idolResultAlt: "{name} result image",
};
