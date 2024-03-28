import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteMachine = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div id="quote-box" className="quote-box" data-testid="quote-box">
      <div id="text" className="quote-text" data-testid="quote-text">
        {quote}
      </div>
      <div id="author" className="quote-author" data-testid="quote-author">
        - {author}
      </div>
      <button
        id="new-quote"
        className="new-quote-btn"
        onClick={handleNewQuote}
        data-testid="new-quote-button"
      >
        New Quote
      </button>
      <a
        id="tweet-quote"
        className="tweet-quote-btn"
        href="#"
        onClick={tweetQuote}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="tweet-quote-button"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default QuoteMachine;
