(function () {
  const params = new URLSearchParams(window.location.search);
  const genreId = params.get("genre");
  const data = window.PORTFOLIO_DATA;
  const genre = data.genres[genreId];

  const title = document.getElementById("genre-title");
  const content = document.getElementById("genre-content");

  if (!genre) {
    document.title = "Not Found — Ryuto Shima";
    title.textContent = "ページが見つかりません";
    content.innerHTML = '<p class="status-text">指定されたジャンルはありません。</p>';
    return;
  }

  title.textContent = genre.label;
  document.title = genre.label + " — Ryuto Shima";

  if (!genre.works.length) {
    content.innerHTML = '<p class="status-text">' + genre.status + '</p>';
    return;
  }

  const grid = document.createElement("div");
  grid.className = "work-grid";

  genre.works.forEach(function (workId) {
    const work = data.works[workId];
    if (!work) return;

    const link = document.createElement("a");
    link.className = work.image ? "work-card" : "work-card work-card--text";
    link.href = "work.html?id=" + encodeURIComponent(workId);

    if (work.image) {
      const media = document.createElement("div");
      media.className = "work-card-media";

      const img = document.createElement("img");
      img.src = work.image;
      img.alt = work.title;
      img.loading = "lazy";

      media.appendChild(img);
      link.appendChild(media);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "work-card-media work-card-media--empty";
      const label = document.createElement("span");
      label.className = "latin";
      label.textContent = "VIEW";
      placeholder.appendChild(label);
      link.appendChild(placeholder);
    }

    const name = document.createElement("h2");
    name.className = "work-card-title";
    if (/^[\x00-\x7F\s]+$/.test(work.title)) name.classList.add("latin");
    name.textContent = work.title;
    link.appendChild(name);

    grid.appendChild(link);
  });

  content.appendChild(grid);
})();
