import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { searchText } = params;

    // Find users matching the search text in the username
    const matchingUsers = await User.find({
      username: { $regex: searchText, $options: "i" },
    }).select("_id"); // Select only the _id of users for the search

    // Find quotes that match either tag, quote, or creator (matching user IDs)
    const quoteData = await Quote.find({
      $or: [
        { tag: { $regex: searchText, $options: "i" } }, // Search in tag
        { quote: { $regex: searchText, $options: "i" } }, // Search in quote
        { creator: { $in: matchingUsers } }, // Search for matching user IDs
      ],
    }).populate("creator"); // Populate creator details

   

    return new Response(JSON.stringify(quoteData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error?.message }), {
      status: 500,
    });
  }
};
