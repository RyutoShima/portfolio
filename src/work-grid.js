// Genre and Works index use the same consistent grid, including slots for future photographs.
window.renderPortfolioWorkGrid = function (workIds) {
  const data = window.PORTFOLIO_DATA;
  const grid = document.createElement("div");
  grid.className = "work-grid";
  workIds.forEach(function (workId) {
    const work = data.works[workId];
    if (!work) return;
    const link = document.createElement("a");
    link.className = "work-item";
    link.href = "work.html?id=" + encodeURIComponent(workId);

    const media = document.createElement("div");
    media.className = "work-media";
    if (work.image) {
      const img = document.createElement("img");
      img.src = work.image;
      img.alt = "";
      img.loading = "lazy";
      media.appendChild(img);
    } else {
      media.classList.add("work-media--pending");
      const label = document.createElement("span");
      label.className = "media-pending-text";
      label.textContent = "画像未登録";
      media.appendChild(label);
    }
    link.appendChild(media);
    if (work.metadata) {
      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = work.metadata;
      link.appendChild(meta);
    }
    const name = document.createElement("h2");
    name.className = "work-item-title";
    if (/^[\x00-\x7F]+$/.test(work.title)) name.classList.add("latin");
    name.textContent = work.title;
    link.appendChild(name);
    if (work.externalUrl) {
      const note = document.createElement("p");
      note.className = "meta";
      note.textContent = "動画を見る ↗";
      link.appendChild(note);
    }
    grid.appendChild(link);
  });
  return grid;
};
