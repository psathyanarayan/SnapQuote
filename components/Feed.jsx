"use client";

import { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";
import { useRouter } from "next/navigation";

const QuoteCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((quote) => (
          <QuoteCard
            key={quote._id}
            quote={quote}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  // Debounced search function
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      let res;
      if (searchText.length > 0) {
        res = await fetch(`/api/quote/search/${searchText}`);
      } else {
        res = await fetch("/api/quote");
      }

      const data = await res.json();
      setQuote(data);
      setLoading(false);
    };

    const debounceFetch = setTimeout(() => {
      fetchQuotes();
    }, 500); // 500ms debounce time

    return () => clearTimeout(debounceFetch); // Cleanup debounce on unmount or value change
  }, [searchText]);
  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search for a tag, username, or quote"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <QuoteCardList
          data={quote}
          handleTagClick={(tag) => route.push(`/tag/${tag}`)}
        />
      )}
    </section>
  );
};

export default Feed;
