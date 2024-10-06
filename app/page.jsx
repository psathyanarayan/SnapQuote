"use client";

import Feed from "@components/Feed";
import { useState, useEffect, useRef } from "react";
const Home = () => {
  const [text, setText] = useState("");
  const fullText = "Share Your Boldest Quotes";
  const indexRef = useRef(0);
  useEffect(() => {
    const typeWriter = () => {
      if (indexRef.current < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(typeWriter, 150); // Typing speed in ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <section className="w-full flex-center flex-col">
      {/* Underscre means styles from global css  */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 lg:mb-8">
        <span className="block mb-2 md:mb-4">Unleash Words</span>
        <span className="typewriter_text blue_gradient_two inline-block">
          {text}
        </span>
      </h1>
       
      <p className="desc text-center text-4sm md:text-5sm lg:text-6sm mb-4 md:mb-6 lg:mb-8">
        SnapQuote is the ultimate platform for bold thinkers and quote
        enthusiasts—where you unleash, craft, and share unforgettable quotes
        that spark conversations and inspire the world.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
