(function () {
  const workId = new URLSearchParams(window.location.search).get("id");
  const data = window.PORTFOLIO_DATA;
  const work = Object.hasOwn(data.works, workId) ? data.works[workId] : null;
  const root = document.getElementById("work-content");
  if (!work) {
    document.title = "Not Found — Ryuto Shima";
    root.innerHTML = '<h1 class="page-title">ページが見つかりません</h1><p class="status-text">指定された作品はありません。</p>';
    return;
  }
  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "genre.html?genre=" + encodeURIComponent(work.genre);
  back.textContent = "← " + data.genres[work.genre].label;
  root.appendChild(back);
  const title = document.createElement("h1");
  title.className = "work-title";
  if (/^[\x00-\x7F]+$/.test(work.title)) title.classList.add("latin");
  title.textContent = work.title;
  root.appendChild(title);
  document.title = work.title + " — Ryuto Shima";
  if (work.metadata) {
    const meta = document.createElement("p");
    meta.className = "meta work-meta";
    meta.textContent = work.metadata;
    root.appendChild(meta);
  }
  const mediaStack = document.createElement("div");
  mediaStack.className = "work-stack";
  // media preserves the author's order, including interleaved photographs and videos.
  // Older entries may still use images or image.
  const sources = Array.isArray(work.media) ? work.media : (work.images || (work.image ? [work.image] : []));
  sources.forEach(function (source, index) {
    const figure = document.createElement("figure");
    figure.className = "work-photo";
    if (/\\.(?:mp4|webm|ogg)(?:[?#]|$)/i.test(source)) {
      const video = document.createElement("video");
      video.src = source;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", work.title + " — 動画 " + (index + 1));
      const fallback = document.createElement("a");
      fallback.href = source;
      fallback.textContent = "動画ファイルを開く";
      video.appendChild(fallback);
      figure.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = source;
      img.alt = work.title + " — 画像 " + (index + 1);
      img.decoding = "async";
      if (index > 0) img.loading = "lazy";
      figure.appendChild(img);
    }
    mediaStack.appendChild(figure);
  });
  if (work.externalUrl) {
    const external = document.createElement("a");
    external.className = "external-link";
    external.href = work.externalUrl;
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = "YouTubeで見る ↗";
    external.setAttribute("aria-label", "YouTubeで見る（新しいタブ）");
    mediaStack.appendChild(external);
  }
  if (work.description) {
    const description = document.createElement("div");
    description.className = "work-description";
    work.description.split(/\n\s*\n/).forEach(function (paragraph) {
      const text = document.createElement("p");
      text.textContent = paragraph;
      description.appendChild(text);
    });
    mediaStack.appendChild(description);
  }
  if (!sources.length && !work.externalUrl && !work.description) {
    const pending = document.createElement("p");
    pending.className = "status-text";
    pending.textContent = "画像・詳細情報は未登録です。";
    mediaStack.appendChild(pending);
  }
  root.appendChild(mediaStack);
})();
