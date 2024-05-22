let apiQuotes = [];

const qouteContainer = document.getElementById('quote-container');
const qouteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQouteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show the loading
function loading() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

// hide loading 
function complete() {
    loader.hidden = true;
    qouteContainer.hidden = false;
}

function newQuote() {
    loading();
    // pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        qouteText.classList.add('long-quote');
    } else {
        qouteText.classList.remove('long-quote');
    }
    // set quote hide loader
    qouteText.textContent = quote.text;
    complete();
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQouteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// Get Quoutes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQoute();
    } catch (error) {
        // alert(error);
    }
    complete();
}

// on load
getQuotes();