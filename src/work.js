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
  const layout = document.createElement("div");
  layout.className = "work-detail-layout";

  const mediaStack = document.createElement("div");
  mediaStack.className = "work-stack work-detail-media";
  const heading = document.createElement("div");
  heading.className = "work-detail-heading";
  const copy = document.createElement("div");
  copy.className = "work-detail-text";

  const title = document.createElement("h1");
  title.className = "work-title";
  if (/^[\x00-\x7F]+$/.test(work.title)) title.classList.add("latin");
  title.textContent = work.title;
  heading.appendChild(title);
  document.title = work.title + " — Ryuto Shima";
  if (work.metadata) {
    const meta = document.createElement("p");
    meta.className = "meta work-meta";
    meta.textContent = work.metadata;
    heading.appendChild(meta);
  }
  // media preserves the author's order, including interleaved photographs and videos.
  // Older entries may still use images or image.
  const sources = Array.isArray(work.media) ? work.media : (work.images || (work.image ? [work.image] : []));
  if (sources.length) {
    const gallery = document.createElement("section");
    gallery.className = "work-gallery";
    gallery.setAttribute("aria-label", work.title + " の画像と動画");

    const viewer = document.createElement("div");
    viewer.className = "work-gallery-viewer";
    viewer.tabIndex = 0;
    viewer.setAttribute("aria-label", "メイン表示。左右の矢印キー、またはスワイプで切り替え");

    const screen = document.createElement("div");
    screen.className = "work-gallery-screen";
    viewer.appendChild(screen);

    const thumbnails = [];
    let thumbnailStrip = null;
    let activeIndex = 0;
    let startTouch = null;

    function isVideo(source) {
      return /\.(?:mp4|webm|ogg)(?:[?#]|$)/i.test(source);
    }

    // YouTube URLs are embedded only when their slide is selected.
    function getYouTubeId(source) {
      try {
        const url = new URL(source);
        const host = url.hostname.toLowerCase();
        let id = null;
        if (host === "youtu.be" || host === "www.youtu.be") {
          id = url.pathname.split("/")[1];
        } else if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(host)) {
          if (url.pathname === "/watch") id = url.searchParams.get("v");
          if (/^\/(?:embed|shorts|live)\//.test(url.pathname)) id = url.pathname.split("/")[2];
        }
        return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      } catch (error) {
        return null;
      }
    }

    function selectMedia(index) {
      if (index < 0 || index >= sources.length || index === activeIndex && screen.firstChild) return;
      const previousVideo = screen.querySelector("video");
      if (previousVideo) previousVideo.pause();

      activeIndex = index;
      const source = sources[index];
      const youtubeId = getYouTubeId(source);
      let media;
      if (youtubeId) {
        media = document.createElement("iframe");
        media.src = "https://www.youtube-nocookie.com/embed/" + youtubeId;
        media.title = work.title + " — YouTube動画 " + (index + 1);
        media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        media.allowFullscreen = true;
        media.referrerPolicy = "strict-origin-when-cross-origin";
        media.loading = "lazy";
      } else if (isVideo(source)) {
        media = document.createElement("video");
        media.src = source;
        media.controls = true;
        media.playsInline = true;
        media.preload = "metadata";
        media.setAttribute("aria-label", work.title + " — 動画 " + (index + 1));
        const fallback = document.createElement("a");
        fallback.href = source;
        fallback.textContent = "動画ファイルを開く";
        media.appendChild(fallback);
      } else {
        media = document.createElement("img");
        media.src = source;
        media.alt = work.title + " — 画像 " + (index + 1);
        media.decoding = "async";
      }
      media.className = "work-gallery-main-media" + (youtubeId ? " work-gallery-youtube" : "");
      screen.replaceChildren(media);

      thumbnails.forEach(function (button, thumbIndex) {
        button.setAttribute("aria-pressed", thumbIndex === activeIndex ? "true" : "false");
      });
      if (counter) counter.textContent = (activeIndex + 1) + " / " + sources.length;
      // Keep the chosen square thumbnail visible without scrolling the whole page.
      const selected = thumbnails[activeIndex];
      if (selected && thumbnailStrip && thumbnailStrip.scrollTo) {
        const start = selected.offsetLeft;
        const end = start + selected.offsetWidth;
        const visibleStart = thumbnailStrip.scrollLeft;
        const visibleEnd = visibleStart + thumbnailStrip.clientWidth;
        if (start < visibleStart || end > visibleEnd) {
          thumbnailStrip.scrollTo({
            left: Math.max(0, start - (thumbnailStrip.clientWidth - selected.offsetWidth) / 2),
            behavior: "smooth"
          });
        }
      }
    }

    let counter = null;
    if (sources.length > 1) {
      function createArrow(label, symbol, change, className) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "work-gallery-arrow " + className;
        button.setAttribute("aria-label", label);
        button.textContent = symbol;
        button.addEventListener("click", function () {
          selectMedia((activeIndex + change + sources.length) % sources.length);
        });
        viewer.appendChild(button);
      }
      createArrow("前の画像・動画", "‹", -1, "work-gallery-arrow--prev");
      createArrow("次の画像・動画", "›", 1, "work-gallery-arrow--next");

      gallery.addEventListener("keydown", function (event) {
        if (event.target.tagName === "VIDEO" || event.target.tagName === "A") return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        selectMedia((activeIndex + direction + sources.length) % sources.length);
      });

      viewer.addEventListener("touchstart", function (event) {
        if (event.touches.length !== 1 || event.target.tagName === "VIDEO") {
          startTouch = null;
          return;
        }
        startTouch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }, { passive: true });
      viewer.addEventListener("touchend", function (event) {
        if (!startTouch || !event.changedTouches.length) return;
        const dx = event.changedTouches[0].clientX - startTouch.x;
        const dy = event.changedTouches[0].clientY - startTouch.y;
        startTouch = null;
        if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
        selectMedia((activeIndex + (dx < 0 ? 1 : -1) + sources.length) % sources.length);
      }, { passive: true });
      viewer.addEventListener("touchcancel", function () { startTouch = null; });
    }

    gallery.appendChild(viewer);

    if (sources.length > 1) {
      const controls = document.createElement("div");
      controls.className = "work-gallery-controls";

      const strip = document.createElement("div");
      strip.className = "work-gallery-thumbnails";
      thumbnailStrip = strip;
      strip.setAttribute("role", "group");
      strip.setAttribute("aria-label", "写真・動画のサムネイル");

      sources.forEach(function (source, index) {
        const youtubeId = getYouTubeId(source);
        const videoItem = isVideo(source);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "work-gallery-thumb";
        button.setAttribute("aria-label", (youtubeId ? "YouTube動画 " : videoItem ? "動画 " : "画像 ") + (index + 1) + " を表示");
        button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

        if (youtubeId) {
          const preview = document.createElement("img");
          preview.className = "work-gallery-thumb-media";
          preview.src = "https://i.ytimg.com/vi/" + youtubeId + "/hqdefault.jpg";
          preview.alt = "";
          preview.loading = "lazy";
          button.appendChild(preview);

          const mark = document.createElement("span");
          mark.className = "work-gallery-thumb-play";
          mark.textContent = "▶";
          mark.setAttribute("aria-hidden", "true");
          button.appendChild(mark);
        } else if (videoItem) {
          const preview = document.createElement("video");
          preview.className = "work-gallery-thumb-media";
          preview.src = source + "#t=0.1";
          preview.muted = true;
          preview.playsInline = true;
          preview.preload = "metadata";
          preview.tabIndex = -1;
          preview.setAttribute("aria-hidden", "true");
          button.appendChild(preview);

          const mark = document.createElement("span");
          mark.className = "work-gallery-thumb-play";
          mark.textContent = "▶";
          mark.setAttribute("aria-hidden", "true");
          button.appendChild(mark);
        } else {
          const preview = document.createElement("img");
          preview.className = "work-gallery-thumb-media";
          preview.src = source;
          preview.alt = "";
          preview.loading = index > 5 ? "lazy" : "eager";
          button.appendChild(preview);
        }
        button.addEventListener("click", function () { selectMedia(index); });
        thumbnails.push(button);
        strip.appendChild(button);
      });

      counter = document.createElement("span");
      counter.className = "work-gallery-counter latin";
      counter.setAttribute("aria-live", "polite");
      counter.textContent = "1 / " + sources.length;

      controls.appendChild(strip);
      controls.appendChild(counter);
      gallery.appendChild(controls);
    }

    mediaStack.appendChild(gallery);
    selectMedia(0);
  }
  // Render bilingual text as separate sections; legacy one-language descriptions still work.
  function appendParagraphs(target, value) {
    value.split(/\n\s*\n/).forEach(function (paragraph) {
      if (!paragraph.trim()) return;
      const text = document.createElement("p");
      text.textContent = paragraph.trim();
      target.appendChild(text);
    });
  }

  if (work.descriptionJa || work.descriptionEn) {
    [
      { text: work.descriptionJa, label: "日本語", lang: "ja" },
      { text: work.descriptionEn, label: "English", lang: "en" }
    ].forEach(function (entry) {
      if (!entry.text) return;
      const section = document.createElement("section");
      section.className = "work-description work-description--" + entry.lang;
      section.lang = entry.lang;
      const label = document.createElement("h2");
      label.className = "work-description-label";
      label.textContent = entry.label;
      section.appendChild(label);
      appendParagraphs(section, entry.text);
      copy.appendChild(section);
    });
  } else if (work.description) {
    const description = document.createElement("div");
    description.className = "work-description";
    appendParagraphs(description, work.description);
    copy.appendChild(description);
  }
  if (work.externalUrl) {
    const external = document.createElement("a");
    external.className = "external-link";
    external.href = work.externalUrl;
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = "YouTubeで見る ↗";
    external.setAttribute("aria-label", "YouTubeで見る（新しいタブ）");
    copy.appendChild(external);
  }
  if (!sources.length && !work.externalUrl && !work.description && !work.descriptionJa && !work.descriptionEn) {
    const pending = document.createElement("p");
    pending.className = "status-text";
    pending.textContent = "画像・詳細情報は未登録です。";
    copy.appendChild(pending);
  }
  layout.appendChild(mediaStack);
  layout.appendChild(heading);
  layout.appendChild(copy);
  root.appendChild(layout);
})();
