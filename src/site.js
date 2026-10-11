(function () {
  const data = window.PORTFOLIO_DATA;
  const nav = document.getElementById("site-nav");
  const filename = window.location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(window.location.search);
  const workId = params.get("id");
  const work = workId && Object.hasOwn(data.works, workId) ? data.works[workId] : null;
  const rawGenre = filename === "work.html" ? work && work.genre : params.get("genre");
  const activeGenre = rawGenre === "synth" ? "instrument-analog" : rawGenre;
  const withinWorks = filename === "works.html" || filename === "genre.html" || filename === "work.html";

  function link(text, href, className) {
    const el = document.createElement("a");
    el.href = href;
    el.textContent = text;
    el.className = className || "latin";
    return el;
  }

  const home = link("Home", "index.html", "nav-top latin");
  if (filename === "index.html") home.setAttribute("aria-current", "page");
  nav.appendChild(home);

  const works = link("Works", "works.html", "nav-top latin");
  if (filename === "works.html") works.setAttribute("aria-current", "page");
  else if (withinWorks) works.classList.add("nav-ancestor-current");
  nav.appendChild(works);

  const sub = document.createElement("div");
  sub.className = "nav-subgroup";
  data.navigationGenres.forEach(function (genreId) {
    const genre = data.genres[genreId];
    const child = link(genre.label, "genre.html?genre=" + encodeURIComponent(genreId), "latin");
    if (activeGenre === genreId && filename !== "works.html") {
      child.setAttribute("aria-current", filename === "work.html" ? "location" : "page");
    }
    sub.appendChild(child);
  });
  nav.appendChild(sub);

  const contact = link("Contact", "contact.html", "nav-top latin");
  if (filename === "contact.html") contact.setAttribute("aria-current", "page");
  nav.appendChild(contact);
})();
