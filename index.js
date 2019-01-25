const OMDbAPI = "https://www.omdbapi.com/?apikey=b99a4761&";

//api for user search
function search(searchTerm, callback) {
    const setting = {
        url: OMDbAPI,
        data: {
            s: `${searchTerm}`
        },
        dataType: 'json',
        type: 'GET',
        success: function (data2) {
            callback(data2)
        }
    };
    $.ajax(setting);
}

//Html for search
function renderResult(result) {
    let posterURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png';

    if (result.Poster != 'N/A') {
        posterURL = result.Poster;
    }

    return `
  <div class="movieData">
    <img src="${posterURL}" alt="${result.title}" class="movieImg">
    <h2 class="movieTitle">${result.Title}</h2>
    <div class="moreInfo">
      <button onclick="selectedMovie('${result.imdbID}')" class="moreInfoBtn">More Info</button>
    </div>
    <p>${result.Year}</p>
  </div>`;
}

//will display each movie that the user searched for
function displayMovieData(data) {
    let outputElement = $('.displayInfo');
    const results = data.Search.map((item, index) => renderResult(item));
    $('.displayResult').html(results);
    $('.displayResult').show(results);
    outputElement
        .prop('hidden', true);
}

//will display all the movies the user wanted to search for
function watchSubmit() {
    $('.container').on('submit', function (event) {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.searchBox');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        //remove the sample results
        search(query, displayMovieData);
    })
}

function watchSubmitToScroll() {
    $('.container').on('submit', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 510,
            behavior: 'smooth'
        });
    })
}

//Html for more info
function renderClick(result) {
    let posterURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'

    //if image is not available
    if (result.Poster != 'N/A') {
        posterURL = result.Poster;
    }
    return `
  <img src="${posterURL}" class="poster" alt="${result.title}">
  <div class="movieDesc">
    <h2><u>${result.Title}</u> (${result.Year})</h2>
    <p><b>Released:</b> ${result.Released}</p>
    <p><b>Carrot Rated:</b> ${result.imdbRating}/10</p>
    <p><b>Runtime:</b> ${result.Runtime}</p>
    <p><b>Genre:</b> ${result.Genre}</p>
    <p><b>Director:</b> ${result.Director}</p>
    <p><b>Actor:</b> ${result.Actors}</p>
    <p class="plot"><b>Plot:</b> ${result.Plot}</p>
  </div>
`;
}

//API for more info
function searchInfo(searchTerm, callback) {
    const settingInfo = {
        url: OMDbAPI,
        data: {
            i: `${searchTerm}`
        },
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            callback(data)
        }
    };
    $.ajax(settingInfo);
}

//Recieve the ID and use the id to search for a specific movie the user clicked(more info)
function selectedMovie(id) {
    let movieID = id;
    $('.movieData').hide();
    searchInfo(movieID, displayMovieInfo);
}

function displayMovieInfo(data) {
    let resultsInfo = data;
    let outputElement = $('.displayInfo');
    outputElement
        .prop('hidden', false)
        .html(renderClick(data));
}

//will display a sample search
function searchSample() {
    search('star wars', displayMovieData)
}


//put all the starting function
function startMovie() {
    watchSubmit();
    watchSubmitToScroll();
    searchSample();
}


$(startMovie);