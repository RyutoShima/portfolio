(function () {
  const genreId = new URLSearchParams(window.location.search).get("genre");
  const data = window.PORTFOLIO_DATA;
  const genre = genreId && Object.hasOwn(data.genres, genreId) ? data.genres[genreId] : null;
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
    status.textContent = genre.status || "掲載準備中";
    content.appendChild(status);
    return;
  }
  content.appendChild(window.renderPortfolioWorkGrid(genre.works));
})();
