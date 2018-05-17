const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = 'AIzaSyCk-04xC6t-IUvTUKUSTUzYmlLiIGxa-0g';

//function to get data from youtube API
function getDataFromApi(searchTerm, callback) {
	const query = {
		part: 'snippet',
		key: apiKey,
		q: `${searchTerm} in:name`
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

//function to render results
function renderResults(result) {
	return `<div class="vidResult">
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
      <p class="vidTitle">${result.snippet.title}</p></a>
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
			<img src="${result.snippet.thumbnails.medium.url}" alt="image of video title"></a>
      </div>`;
}

//function to display data 
function displaySearchData(data) {
	const results = data.items.map((item, index) => renderResults(item));
	$('.js-search-results').html(results);
}

//function to make submit button work
function submitButton() {
	$('.js-search').submit(function(event) {
		event.preventDefault();
		let queryTarget = $(event.currentTarget).find('#js-query');
		let searchInput = queryTarget.val();
		queryTarget.val("");
		$('h2').show();
		$('p').show();
		$('.searchResults').prop('hidden', false);
		getDataFromApi(searchInput, displaySearchData); 
	});
}

$(submitButton);
