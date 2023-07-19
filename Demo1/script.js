// script.js

document.addEventListener("DOMContentLoaded", function() {
  const artworkGrid = document.getElementById("artwork-grid");

  fetch("artwork.json")
    .then((response) => response.json())
    .then((artworkFileNames) => {
      artworkFileNames.forEach((fileName) => {
        const filePath = `demos/${fileName}`;
        const artworkItem = createArtworkItem(fileName, filePath);
        artworkGrid.appendChild(artworkItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching artwork file:", error);
    });
});

function createArtworkItem(fileName, filePath) {
  const artworkItem = document.createElement("div");
  artworkItem.className = "artwork-item";

  const artworkImage = document.createElement("img");
  artworkImage.src = filePath;
  artworkImage.alt = fileName;
  artworkImage.onclick = function() {
    openImagePopup(artworkImage.alt);
  };

  const artworkCaption = document.createElement("p");
  artworkCaption.textContent = fileName.split(".")[0];

  artworkItem.appendChild(artworkImage);
  artworkItem.appendChild(artworkCaption);

  return artworkItem;
}
function openImagePopup(altText) {
  const fullImage = document.getElementById("full-image");
  const popupContainer = document.getElementById("popup-container");
  const artworkItem = document.querySelector(`img[alt="${altText}"]`);

  fullImage.src = artworkItem.src;
  fullImage.alt = artworkItem.alt;
  popupContainer.style.display = "flex";

  document.addEventListener("keydown", onEscKeyPressed);
}

function closeImagePopup() {
  const popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "none";

  document.removeEventListener("keydown", onEscKeyPressed);
}

function onEscKeyPressed(event) {
  if (event.key === "Escape") {
    closeImagePopup();
  }
}
