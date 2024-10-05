import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      {/* Underscre means styles from global css  */}
      <h1 className="head_text text-center">
      Unleash Words
        <br className="max-md:hidden" />
        <span className="blue_gradient_two text-center">Share Your Boldest Quotes</span>
      </h1>
       
      <p className="desc text-center">
        Promptify is the ultimate open-source, AI-driven tool for the modern
        creator—where you unlock, craft, and share prompts that ignite
        imagination.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
