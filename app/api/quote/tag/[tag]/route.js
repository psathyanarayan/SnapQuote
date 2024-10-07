import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
import "@models/user"; 
export const revalidate = 0;

export const GET = async (req, { params }) => {
  try {
    // Ensure that the tag is being passed correctly
    if (!params?.tag) {
      return new Response("Tag parameter is missing", { status: 400 });
    }

    await connectToDB();
    const quotesWithTag = await Quote.find({ tag: params.tag }).populate(
      "creator"
    );

    if (quotesWithTag.length === 0) {
      return new Response("No quotes found with the provided tag", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(quotesWithTag), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error?.message}),
      {
        status: 500,
      }
    );
  }
};
