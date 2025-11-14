const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const dateDisplay = document.getElementById('current-date');

function displayDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  dateDisplay.textContent = today.toLocaleDateString('en-US', options);
}

async function fetchQuote() {
  try {
    newQuoteBtn.disabled = true;
    newQuoteBtn.textContent = 'Loading...';

    const response = await fetch('/api/quote');

    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }

    const data = await response.json();

    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `— ${data.author}`;

  } catch (error) {
    quoteText.textContent = 'Failed to load quote. Please try again.';
    quoteAuthor.textContent = '';
    console.error('Error fetching quote:', error);
  } finally {
    newQuoteBtn.disabled = false;
    newQuoteBtn.textContent = 'New Quote';
  }
}

newQuoteBtn.addEventListener('click', fetchQuote);

displayDate();
fetchQuote();
