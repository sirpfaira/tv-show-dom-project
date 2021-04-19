let allEpisodes = [];
let allShows = [];

function setup() {
  //All scheduled shows for the day =>>>> http://api.tvmaze.com/schedule
  fetch('https://api.tvmaze.com/shows/527/episodes')
    .then((response) => response.json())
    .then((data) => init(data))
    .catch((error) => console.error(error));
}
function init(epArr) {
  for (let i = 0; i < epArr.length; i++) {
    allEpisodes[i] = epArr[i];
  }

  if (allEpisodes.length > 0) {
    for (let i = 0; i < allEpisodes.length; i++) {
      const optText = `S${`0${allEpisodes[i].season}`.slice(
        -2
      )}E${`0${allEpisodes[i].number}`.slice(-2)} - ${allEpisodes[i].name}`;
      epSelect.options[epSelect.options.length] = new Option(optText, i + 2);
    }
    makePageForEpisodes(allEpisodes);
  } else {
    setup();
  }
}

function makePageForEpisodes(episodeList) {
  const mainContainer = document.querySelector('#content-container');
  mainContainer.innerHTML = '';
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'row row-cols-1 row-cols-md-3 g-4';

  for (let x = 0; x < episodeList.length; x++) {
    const currentEpisode = episodeList[x];

    const card = document.createElement('div');
    card.className = 'col';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'card';

    const image = document.createElement('img');
    image.className = 'card-img-top h-100';
    image.src = `${currentEpisode.image.original}`;
    image.alt = 'Movie thumbnail';
    imgDiv.appendChild(image);
    card.appendChild(imgDiv);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';
    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = `${currentEpisode.name} - S${(
      '0' + currentEpisode.season
    ).slice(-2)}E${('0' + currentEpisode.number).slice(-2)}`;
    bodyDiv.appendChild(cardTitle);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerHTML = `${currentEpisode.summary}`;
    bodyDiv.appendChild(cardText);
    card.appendChild(bodyDiv);

    const footer = document.createElement('div');
    footer.className = 'card-footer text-center';

    const small = document.createElement('small');
    small.innerHTML = 'Source: TVMaze.com';
    footer.appendChild(small);

    const link = document.createElement('a');
    link.className = 'btn btn-primary left-spacing';
    link.target = '_blank';
    link.href = currentEpisode.url;
    link.innerHTML = 'More info';
    footer.appendChild(link);
    card.appendChild(footer);

    cardsContainer.appendChild(card);
  }
  mainContainer.appendChild(cardsContainer);
  const filmCount = document.querySelector('#search-count');
  filmCount.innerHTML = `Showing ${episodeList.length}/${allEpisodes.length} episodes`;
}

function mySearchFunction() {
  const matchingEpisodes = [];
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase();

  for (let i = 0; i < allEpisodes.length; i++) {
    const item = allEpisodes[i];
    const itemTitle = item.name;
    const itemSummary = item.summary;

    if (
      itemTitle.toUpperCase().indexOf(filter) > -1 ||
      itemSummary.toUpperCase().indexOf(filter) > -1
    ) {
      matchingEpisodes.push(item);
    }
  }

  makePageForEpisodes(matchingEpisodes);
}

let epSelect = document.querySelector('#ep-select');
epSelect.addEventListener('change', (event) => {
  const index = event.target.value;
  let passArray = [];
  if (index == 1) {
    passArray = [...allEpisodes];
  } else {
    passArray.push(allEpisodes[index - 2]);
  }
  makePageForEpisodes(passArray);
});

window.onload = setup;
