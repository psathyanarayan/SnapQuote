"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateQuote = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateQuoteContent router={router} />
    </Suspense>
  );
};

const UpdateQuoteContent = ({ router }) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ quote: "", tag: "" });
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");

  useEffect(() => {
    const fetchDataForEdit = async () => {
      const fetchData = await fetch(`api/quote/${quoteId}`, {
        method: "GET",
      });
      const data = await fetchData.json();
      setPost({ quote: data.quote, tag: data.tag });
    };
    if (quoteId) {
      fetchDataForEdit();
    }
  }, [quoteId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/quote/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default UpdateQuote;