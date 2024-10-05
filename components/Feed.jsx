"use client";

import { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";

const QuoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((quote) => (
        <QuoteCard
          key={quote._id}
          quote={quote}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [quote, setQuote] = useState([]);
  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch("/api/quote");
      const data = await res.json();
      setQuote(data);
    };
    fetchQuotes();
  }, []);
  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <QuoteCardList data={quote} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
