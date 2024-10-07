"use client";
import QuoteCard from "@components/QuoteCard";
import { useState, useEffect } from "react";
const TagData = ({ params }) => {
  const [tagData, setTagData] = useState([]);
  useEffect(() => {
    const fetchTagBasedOnTagName = async() => {
      const res = await fetch(`/api/quote/tag/${params.name}`);
      const data = await res.json();
      setTagData(data);
    };
    fetchTagBasedOnTagName();
  }, []);
  const handleEdit = (quote) => {
    router.push(`/update-quote?id=${quote._id}`);
  };
  const handleDelete = async (quote) => {
    const hasConfirmed = confirm("Are you sure you want to delete ?");
    if (hasConfirmed) {
      try {
        const updatedData = await fetch(`/api/quote/${quote._id}`, {
          method: "DELETE",
        });
        const filteredQuotes = dataByProfile.filter(
          (post) => post._id !== quote._id
        );
        setDataByProfile(filteredQuotes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{params.name}</span>
      </h1>
      <p className="desc text-left">All {params.name} tag data</p>
      <div className="mt-10 prompt_layout">
        {tagData?.map((quote) => (
          <QuoteCard
            key={quote._id}
            quote={quote}
            noClick={true}
            handleEdit={() => handleEdit && handleEdit(quote)}
            handleDelete={() => handleDelete && handleDelete(quote)}
          />
        ))}
      </div>
    </section>
  );
};

export default TagData;
