type BaseSharePayload = {
  title: string;
  text: string;
  url: string;
};

function buildTwitterShareUrl(payload: BaseSharePayload) {
  const params = new URLSearchParams({
    text: payload.text,
    url: payload.url,
  });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

function buildFacebookShareUrl(payload: BaseSharePayload) {
  const params = new URLSearchParams({
    u: payload.url,
  });

  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

function isMobileBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function openTwitterShare(payload: BaseSharePayload): "opened" | "redirected" {
  const shareUrl = buildTwitterShareUrl(payload);

  if (isMobileBrowser()) {
    window.location.href = shareUrl;
    return "redirected";
  }

  window.open(shareUrl, "_blank", "noopener,noreferrer,width=540,height=720");
  return "opened";
}

export function openFacebookShare(payload: BaseSharePayload): "opened" | "redirected" {
  const shareUrl = buildFacebookShareUrl(payload);

  if (isMobileBrowser()) {
    window.location.href = shareUrl;
    return "redirected";
  }

  window.open(shareUrl, "_blank", "noopener,noreferrer,width=626,height=436");
  return "opened";
}

export async function copyShareLink(payload: BaseSharePayload): Promise<"clipboard" | "fallback"> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload.url);
    return "clipboard";
  }

  const textArea = document.createElement("textarea");
  textArea.value = payload.url;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error("copy_failed");
  }

  return "fallback";
}
