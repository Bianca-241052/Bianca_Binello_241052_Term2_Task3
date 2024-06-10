 // Autocomplete functionality
 const searchInput = document.getElementById('searchInput');
 const autocompleteList = document.getElementById('autocomplete-list');

searchInput.addEventListener('input', function() {
    const query = this.value;
    autocompleteList.innerHTML = ''; // Clear previous results
    if (!query) {
        return false;
    }

    // Filter suggestions based on query
    const filteredSuggestions = flights.filter(flight => 
        flight.title.toLowerCase().includes(query.toLowerCase())
    );

    // Populate autocomplete list
    filteredSuggestions.forEach(flight => {
        const div = document.createElement('div');
        const matchStart = flight.title.toLowerCase().indexOf(query.toLowerCase());
        const matchEnd = matchStart + query.length;
        div.innerHTML = `${flight.title.substring(0, matchStart)}<strong>${flight.title.substring(matchStart, matchEnd)}</strong>${flight.title.substring(matchEnd)}`;
        div.addEventListener('click', function() {
            let baseUrl = getBaseUrl().split('#')[0];
            baseUrl += getBaseUrl().includes('pages') ? '' : 'pages/'
            const id = flight.sku;
            const page = baseUrl.includes('flights.html') ? '' : 'flights.html';
            window.location.href = baseUrl + `${page}#${id}`;
            autocompleteList.innerHTML = ''; // Clear the list
        });
        autocompleteList.appendChild(div);
    });
});