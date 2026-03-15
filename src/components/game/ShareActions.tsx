import type { ReactNode } from "react";

type ShareActionItem = {
  key: "twitter" | "facebook" | "copy";
  label: string;
  ariaLabel: string;
  onClick: () => void;
};

type ShareActionsProps = {
  isBusy: boolean;
  onTwitterShare: () => void;
  onFacebookShare: () => void;
  onCopyLink: () => void;
};

function TwitterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.826L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.2c0-.9.2-1.5 1.5-1.5H16V5.1c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.3V11H9v3h2.4v7h2.1Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2]">
      <path d="M14 5l7 7-7 7" />
      <path d="M21 12H9a6 6 0 0 0-6 6" />
    </svg>
  );
}

const actionStyles: Record<ShareActionItem["key"], string> = {
  twitter: "bg-[#221722] text-white shadow-glow",
  facebook: "bg-[#1877F2] text-white shadow-[0_16px_32px_rgba(24,119,242,0.28)]",
  copy: "bg-white text-berry ring-1 ring-rose/80 shadow-card",
};

const iconMap: Record<ShareActionItem["key"], ReactNode> = {
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  copy: <ShareIcon />,
};

export function ShareActions({
  isBusy,
  onTwitterShare,
  onFacebookShare,
  onCopyLink,
}: ShareActionsProps) {
  const items: ShareActionItem[] = [
    { key: "twitter", label: "Twitter", ariaLabel: "Share on Twitter", onClick: onTwitterShare },
    { key: "facebook", label: "Facebook", ariaLabel: "Share on Facebook", onClick: onFacebookShare },
    { key: "copy", label: "Copy Link", ariaLabel: "Copy link", onClick: onCopyLink },
  ];

  return (
    <div className="relative z-10 rounded-[28px] bg-gradient-to-b from-white/90 to-rose/35 px-4 py-5">
      <div className="flex items-start justify-center gap-4 sm:gap-5">
        {items.map((item) => (
          <div key={item.key} className="flex min-w-[78px] flex-col items-center">
            <button
              type="button"
              aria-label={item.ariaLabel}
              disabled={isBusy}
              onClick={item.onClick}
              className={[
                "relative z-10 flex h-16 w-16 touch-manipulation items-center justify-center rounded-full transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush disabled:cursor-not-allowed disabled:opacity-55",
                actionStyles[item.key],
              ].join(" ")}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {iconMap[item.key]}
            </button>
            <span className="mt-2 text-xs font-semibold tracking-[-0.02em] text-berry">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
