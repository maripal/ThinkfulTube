const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

//function to get data from youtube API
function getDataFromApi(searchTerm, callback) {
	const query = {
		part: 'snippet',
		key: 'AIzaSyCk-04xC6t-IUvTUKUSTUzYmlLiIGxa-0g',
		q: `${searchTerm} in:name`
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

//function to render results
function renderResults(result) {
	return `<img src="${result.default}">`;
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

		const queryTarget = $(this).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromApi(query, displaySearchData); 
		console.log('submit button working');
	});
}

$(submitButton);
