import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
import User from "@models/user"; 
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { searchText } = params;
    const quoteData = await Quote.findOne({
      $or: [
        { tag: { $regex: searchText, $options: "i" } }, // Check for searchText in tag
        { quote: { $regex: searchText, $options: "i" } }, // Check for searchText in quote
        {
          creator: await User.findOne({
            username: { $regex: searchText, $options: "i" }, // Check for searchText in creator's username
          }),
        },
      ],
    }).populate("creator"); // Populate creator details

    if (!quoteData) {
      return new Response("Search Item not found", { status: 404 });
    }
    return new Response(JSON.stringify(quoteData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error?.message }), {
      status: 500,
    });
  }
};
