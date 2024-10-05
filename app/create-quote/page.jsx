"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateQuote = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [post, setPost] = useState({
    quote: "",
    tag: "",
  });

  const createQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote/new", {
        method: "POST",
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user.id,
          tage: post.tag,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createQuote}
    />
  );
};

export default CreateQuote;
