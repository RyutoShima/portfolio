(function () {
  const params = new URLSearchParams(window.location.search);
  const workId = params.get("id");
  const data = window.PORTFOLIO_DATA;
  const work = data.works[workId];
  const root = document.getElementById("work-content");

  if (!work) {
    document.title = "Not Found — Ryuto Shima";
    root.innerHTML = '<h1 class="page-title">ページが見つかりません</h1><p class="status-text">指定された作品はありません。</p>';
    return;
  }

  const genre = data.genres[work.genre];

  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "genre.html?genre=" + encodeURIComponent(work.genre);
  back.textContent = "← " + genre.label;
  root.appendChild(back);

  const title = document.createElement("h1");
  title.className = "work-title";
  if (/^[\x00-\x7F\s]+$/.test(work.title)) title.classList.add("latin");
  title.textContent = work.title;
  root.appendChild(title);

  document.title = work.title + " — Ryuto Shima";

  if (work.image) {
    const figure = document.createElement("figure");
    figure.className = "work-hero";

    const img = document.createElement("img");
    img.src = work.image;
    img.alt = work.title;

    figure.appendChild(img);
    root.appendChild(figure);
  }

  if (work.externalUrl) {
    const external = document.createElement("a");
    external.className = "external-link latin";
    external.href = work.externalUrl;
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = "YouTube →";
    root.appendChild(external);
  }
})();
