import axios from 'axios';

const QUOTE_API_URL = 'https://api.quotable.io/random';

// Get a random quote
const getRandomQuote = async () => {
  try {
    const response = await axios.get(QUOTE_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Return a fallback quote if API fails
    return {
      content: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu"
    };
  }
};

export default {
  getRandomQuote
};