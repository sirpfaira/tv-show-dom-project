let allEpisodes = [];
let epSelect = document.querySelector('.ep-select');

function setup() {
  var intent = decodeURIComponent(window.location.search).substring(1);
  var queries = intent.split('&');
  var SHOW_ID = queries[1];
  const headerTitle = document.querySelector('.header-title');
  headerTitle.innerHTML = `${queries[0]} episodes`;

  fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`)
    .then((response) => response.json())
    .then((data) => init(data))
    .catch((error) => console.error(error));
  //init(getAllEpisodes());
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
    refreshPage(allEpisodes);
  } else {
    setup();
  }
}

function refreshPage(episodesArr) {
  const mainContainer = document.querySelector('.episode-container');
  mainContainer.innerHTML = '';
  const filmCount = document.querySelector('.search-count');
  if (episodesArr.length < allEpisodes.length) {
    filmCount.innerHTML = `Found ${episodesArr.length} episodes`;
  } else {
    filmCount.innerHTML = `Search episode by name, genre or keyword`;
  }

  for (episode of episodesArr) {
    mainContainer.appendChild(getEpisodeCard(episode));
  }

  /*let elArr = document.querySelectorAll('.card-button');
  //console.log(elArr.length);

  elArr.forEach((item) => {
    item.addEventListener('click', (event) => {
      var queryString = `?${item.href}`;
      window.location.href = 'episode-page.html' + queryString;
      //alert('pane chandifamba');
    });
  });*/
}

function getEpisodeCard(episode) {
  const card = document.createElement('div');
  card.className = 'ep-card';

  const cardHeading = document.createElement('div');
  cardHeading.className = 'ep-heading';
  const showTitle = document.createElement('p');
  showTitle.className = 'ep-title';
  showTitle.innerHTML = `${episode.name} - S${('0' + episode.season).slice(
    -2
  )}E${('0' + episode.number).slice(-2)}`;
  cardHeading.appendChild(showTitle);
  card.appendChild(cardHeading);

  const imgDiv = document.createElement('div');
  imgDiv.className = 'ep-img-div';
  const image = document.createElement('img');
  image.className = 'ep-img';
  const imgSrc = episode.image;
  image.src = imgSrc == null ? '' : imgSrc.medium;
  image.alt = 'Episode thumbnail';
  imgDiv.appendChild(image);
  card.appendChild(imgDiv);

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'ep-card-body';
  const cardText = document.createElement('p');
  cardText.className = 'ep-summary';
  cardText.innerHTML = truncateString(episode.summary, 150);
  bodyDiv.appendChild(cardText);
  card.appendChild(bodyDiv);

  const footer = document.createElement('div');
  footer.className = 'ep-card-footer';
  const small = document.createElement('small');
  small.innerHTML = 'Source: TVMaze.com';
  footer.appendChild(small);

  const link = document.createElement('a');
  link.className = 'btn btn-success left-spacing';
  link.target = '_blank';
  link.href = episode.url;
  link.innerHTML = 'More info...';
  footer.appendChild(link);
  card.appendChild(footer);

  return card;
}

function mySearchFunction() {
  const matchingEpisodes = [];
  const input = document.querySelector('.search-bar');
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

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

window.onload = setup;
