//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const cardContainer = document.getElementById("cards-container");

  let myEp = episodeList[0];
  let cardImg = document.querySelector(".card-img-top");
  cardImg.src = `${myEp.image.original}`;
  let cardTitle = document.querySelector(".card-title");
  cardTitle.innerHTML = `${myEp.name} - S${("0" + myEp.season).slice(-2)}E${(
    "0" + myEp.number
  ).slice(-2)}`;
  let cardText = document.querySelector(".card-text");
  cardText.innerHTML = `${myEp.summary}`;
  let cardButton = document.querySelector(".btn");
  cardButton.href = myEp.url;

  for (let x = 1; x < episodeList.length; x++) {
    let clone = document.querySelector(".col").cloneNode(true);

    myEp = episodeList[x];
    let cardTitle = clone.querySelector(".card-title");
    cardTitle.innerHTML = `${myEp.name} - S${("0" + myEp.season).slice(-2)}E${(
      "0" + myEp.number
    ).slice(-2)}`;

    let cardImg = clone.querySelector(".card-img-top");
    cardImg.src = `${myEp.image.original}`;
    let cardText = clone.querySelector(".card-text");
    cardText.innerHTML = `${myEp.summary}`;

    let cardButton = document.querySelector(".btn");
    cardButton.href = myEp.url;
    cardContainer.appendChild(clone);
  }
}

window.onload = setup;
