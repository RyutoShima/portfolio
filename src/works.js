(function () {
  const data = window.PORTFOLIO_DATA;
  const content = document.getElementById("works-content");
  data.navigationGenres.forEach(function (genreId) {
    const genre = data.genres[genreId];
    const section = document.createElement("section");
    section.className = "genre-section";
    const heading = document.createElement("h2");
    heading.className = "genre-section-title latin";
    const headingLink = document.createElement("a");
    headingLink.href = "genre.html?genre=" + encodeURIComponent(genreId);
    headingLink.textContent = genre.label;
    heading.appendChild(headingLink);
    section.appendChild(heading);

    if (genre.works.length) {
      section.appendChild(window.renderPortfolioWorkGrid(genre.works));
    } else {
      const status = document.createElement("p");
      status.className = "status-text";
      status.textContent = genre.status || "掲載準備中";
      section.appendChild(status);
    }
    content.appendChild(section);
  });
})();
