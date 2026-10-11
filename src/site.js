(function () {
  const params = new URLSearchParams(window.location.search);
  const data = window.PORTFOLIO_DATA;
  const filename = window.location.pathname.split("/").pop();
  const isWork = filename === "work.html";
  const workId = params.get("id");
  const work = Object.hasOwn(data.works, workId) ? data.works[workId] : null;
  const genre = isWork ? work && work.genre : params.get("genre");

  document.querySelectorAll("[data-genre]").forEach(function (link) {
    if (link.dataset.genre === genre) {
      link.setAttribute("aria-current", isWork ? "location" : "page");
    }
  });
  if (!filename || filename === "index.html") {
    document.querySelector('[data-page="home"]').setAttribute("aria-current", "page");
  }
})();
