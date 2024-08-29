const apiUrl = "https://aves.ninjas.cl/api/birds";
const menu = document.getElementById("birdsMenu");
const content = document.getElementById("birdsContent");
const searchInput = document.getElementById("searchInput");

let birdsData = [];

function createBirdMenuItem(bird, index) {
  const menuItem = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = `#bird-${index}`;
  anchor.textContent = bird.name.spanish;
  anchor.setAttribute("data-target", `bird-${index}`);
  menuItem.appendChild(anchor);
  menu.appendChild(menuItem);
}

function createBirdContentItem(bird, index) {
  const contentItem = document.createElement("div");
  contentItem.classList.add("bird-item");
  contentItem.id = `bird-${index}`;

  const title = document.createElement("h2");
  title.classList.add("title", "is-4");
  title.textContent = bird.name.spanish;

  const image = document.createElement("img");
  image.src = bird.images.main;
  image.alt = bird.name.spanish;

  const description = document.createElement("p");
  description.textContent = bird.habitat;

  const link = document.createElement("a");
  link.href = bird.link;
  link.textContent = "Más información";
  link.target = "_blank";

  contentItem.appendChild(title);
  contentItem.appendChild(image);
  contentItem.appendChild(description);
  contentItem.appendChild(link);
  content.appendChild(contentItem);
}

function filterBirds(query) {
  const filteredBirds = birdsData.filter((bird) =>
    bird.name.spanish.toLowerCase().includes(query.toLowerCase())
  );
  menu.innerHTML = "";
  content.innerHTML = "";
  filteredBirds.forEach((bird, index) => {
    createBirdMenuItem(bird, index);
    createBirdContentItem(bird, index);
  });
  attachScrollSpy();
}

function attachScrollSpy() {
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  window.addEventListener("scroll", () => {
    let fromTop = window.scrollY + 10;
    menuLinks.forEach((link) => {
      let section = document.getElementById(link.getAttribute("data-target"));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  });
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    birdsData = data;
    birdsData.forEach((bird, index) => {
      createBirdMenuItem(bird, index);
      createBirdContentItem(bird, index);
    });
    attachScrollSpy();
  });

searchInput.addEventListener("input", () => {
  filterBirds(searchInput.value);
});
