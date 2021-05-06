let allShows = [];
const showSelect = document.querySelector('.show-select');

function setup() {
  fetch('https://api.tvmaze.com/shows')
    .then((response) => response.json())
    .then((data) => init(data))
    .catch((error) => console.error(error));

  //init(getAllShows());
}

function init(showArr) {
  for (let i = 0; i < showArr.length; i++) {
    allShows[i] = showArr[i];
  }

  if (allShows.length > 0) {
    for (let i = 0; i < allShows.length; i++) {
      const optText = `${allShows[i].name}`;
      showSelect.options[showSelect.options.length] = new Option(
        optText,
        i + 2
      );
    }
    refreshPage(allShows);
  } else {
    setup();
  }
}

function refreshPage(showArr) {
  const cardsContainer = document.querySelector('.content-container');
  cardsContainer.innerHTML = '';
  const filmCount = document.querySelector('.search-count');
  if (showArr.length < allShows.length) {
    filmCount.innerHTML = `Found ${showArr.length} shows`;
  } else {
    filmCount.innerHTML = `Search by name or keyword`;
  }
  for (show of showArr) {
    cardsContainer.appendChild(getShowCard(show));
  }

  let elArr = document.querySelectorAll('.card-button');
  //console.log(elArr.length);

  elArr.forEach((item) => {
    item.addEventListener('click', (event) => {
      var queryString = `?${item.href}`;
      window.location.href = 'episode-page.html' + queryString;
      //alert('pane chandifamba');
    });
  });
}

function getShowCard(show) {
  const card = document.createElement('div');
  card.className = 'full-card';
  const cardHeading = document.createElement('div');
  cardHeading.className = 'card-heading';
  const showTitle = document.createElement('p');
  showTitle.className = 'show-title';
  showTitle.innerHTML = show.name;
  cardHeading.appendChild(showTitle);
  card.appendChild(cardHeading);
  const cardBody = document.createElement('div');
  cardBody.className = 'card-content';
  const imgDiv = document.createElement('div');
  imgDiv.className = 'img-div';
  const showImage = document.createElement('img');
  const imgSrc = show.image;
  showImage.src = imgSrc == null ? '' : imgSrc.medium;
  showImage.alt = 'Show image';
  showImage.className = 'show-img';
  imgDiv.appendChild(showImage);
  cardBody.appendChild(imgDiv);
  const descDiv = document.createElement('div');
  descDiv.className = 'desc-div';
  const showDesc = document.createElement('p');
  showDesc.innerHTML = truncateString(show.summary, 800);
  descDiv.appendChild(showDesc);
  cardBody.appendChild(descDiv);
  const infoDiv = document.createElement('div');
  infoDiv.className = 'info-div';
  const rated = document.createElement('p');
  let bold = document.createElement('b');
  bold.innerHTML = 'Rated:  ';
  const span = document.createElement('span');
  span.className = 'rating';
  span.innerHTML = show.rating.average;
  rated.appendChild(bold);
  rated.appendChild(span);
  infoDiv.appendChild(rated);
  const genres = document.createElement('p');
  let bold1 = document.createElement('b');
  bold1.innerHTML = 'Genres:  ';
  const span1 = document.createElement('span');
  span1.className = 'genres';
  span1.innerHTML = show.genres.join(' | ');
  genres.appendChild(bold1);
  genres.appendChild(span1);
  infoDiv.appendChild(genres);
  const status = document.createElement('p');
  let bold2 = document.createElement('b');
  bold2.innerHTML = 'Status:  ';
  const span2 = document.createElement('span');
  span2.className = 'status';
  span2.innerHTML = show.status;
  status.appendChild(bold2);
  status.appendChild(span2);
  infoDiv.appendChild(status);
  const runtime = document.createElement('p');
  let bold3 = document.createElement('b');
  bold3.innerHTML = 'Runtime:  ';
  const span3 = document.createElement('span');
  span3.className = 'runtime';
  span3.innerHTML = `${show.runtime} hrs`;
  runtime.appendChild(bold3);
  runtime.appendChild(span3);
  infoDiv.appendChild(runtime);
  const button = document.createElement('button');
  button.className = 'card-button btn btn-success';
  button.innerHTML = 'More info...';
  button.href = `${show.name}&${show.id}`;
  infoDiv.appendChild(button);
  cardBody.appendChild(infoDiv);
  card.appendChild(cardBody);
  return card;
}

function searchFunction() {
  const filteredShows = [];
  const input = document.querySelector('.search-bar');
  const filter = input.value.toUpperCase();

  for (let i = 0; i < allShows.length; i++) {
    const item = allShows[i];
    const itemTitle = item.name;
    const itemSummary = item.summary;
    const genres = item.genres.map((genre) => genre.toUpperCase());

    if (
      itemTitle.toUpperCase().indexOf(filter) > -1 ||
      itemSummary.toUpperCase().indexOf(filter) > -1 ||
      genres.includes(filter)
    ) {
      filteredShows.push(item);
    }
  }

  refreshPage(filteredShows);
}

showSelect.addEventListener('change', (event) => {
  const index = event.target.value;
  let passArray = [];
  if (index == 1) {
    passArray = [...allShows];
  } else {
    passArray.push(allShows[index - 2]);
  }
  refreshPage(passArray);
});

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

window.onload = setup;
