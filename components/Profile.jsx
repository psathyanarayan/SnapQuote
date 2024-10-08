import QuoteCard from "./QuoteCard";
const Profile = ({
  noClick,
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data?.map((quote) => (
          <QuoteCard
            key={quote._id}
            quote={quote}
            noClick={noClick}
            handleEdit={() => handleEdit && handleEdit(quote)}
            handleDelete={() => handleDelete && handleDelete(quote)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
