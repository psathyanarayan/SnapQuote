import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient_two">{type} Quote</span>{" "}
      </h1>
      <p className="desc text-left max-w-md">
        {type} & Drop your wildest quotes, shake the internet, and let the world
        question your sanity!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-grey-700">
            Your Quote
          </span>
        </label>
        <textarea
          value={post.quote}
          onChange={(e) => setPost({ ...post, quote: e.target.value })}
          placeholder="Unleash your wildest thoughts here—because the world needs your spicy wisdom!"
          required
          className="form_textarea"
        />
        <label>
          <span className="font-satoshi font-semibold text-base text-grey-700">
            Tags{`  `}
          </span>
        </label>
        <input
          type="text"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="tag"
          required
          className="form_input"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-blue rounded-full text-white cursor-pointer"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
