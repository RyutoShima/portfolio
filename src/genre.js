(function () {
  const genreId = new URLSearchParams(window.location.search).get("genre");
  const data = window.PORTFOLIO_DATA;
  const genre = Object.hasOwn(data.genres, genreId) ? data.genres[genreId] : null;
  const title = document.getElementById("genre-title");
  const content = document.getElementById("genre-content");

  if (!genre) {
    document.title = "Not Found — Ryuto Shima";
    title.textContent = "ページが見つかりません";
    content.innerHTML = '<p class="status-text">指定されたジャンルはありません。</p>';
    return;
  }
  title.textContent = genre.label;
  if (/^[\x00-\x7F]+$/.test(genre.label)) title.classList.add("latin");
  document.title = genre.label + " — Ryuto Shima";

  if (!genre.works.length) {
    const status = document.createElement("p");
    status.className = "status-text";
    status.textContent = genre.status;
    content.appendChild(status);
    return;
  }
  const grid = document.createElement("div");
  grid.className = "work-grid";
  genre.works.forEach(function (workId) {
    const work = data.works[workId];
    if (!work) return;
    const link = document.createElement("a");
    link.className = "work-item";
    link.href = "work.html?id=" + encodeURIComponent(workId);
    if (work.image) {
      const media = document.createElement("div");
      media.className = "work-media";
      const img = document.createElement("img");
      img.src = work.image;
      img.alt = "";
      img.loading = "lazy";
      media.appendChild(img);
      link.appendChild(media);
    }
    // Only display metadata actually provided in data.js.
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
      const label = document.createElement("p");
      label.className = "meta";
      label.textContent = "動画を見る ↗";
      link.appendChild(label);
    }
    grid.appendChild(link);
  });
  content.appendChild(grid);
})();
