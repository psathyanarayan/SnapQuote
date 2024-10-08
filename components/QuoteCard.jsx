"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const QuoteCard = ({
  noClick,
  quote,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopy(quote.quote);
    navigator.clipboard.writeText(quote.quote);
    setTimeout(() => setCopy(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap5 ">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={quote.creator.image}
            alt="Creator Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div
            className="flex flex-col"
            onClick={() =>
              !noClick &&
              router.push(
                `profile/${quote.creator._id}?name=${quote.creator.username}`
              )
            }
          >
            <h3 className="font-satoshi font-semibold text-gray-900">
              {quote.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {quote.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === quote.quote
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-700 text-sm">{quote.quote}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(quote.tag)}
      >
        #{quote.tag}
      </p>
      {session?.user.id === quote.creator._id &&
        (pathName === "/profile" ||
          pathName === `/profile/${session?.user.id}`) && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm blue_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm red_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default QuoteCard;
