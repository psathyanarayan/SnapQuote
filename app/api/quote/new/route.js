import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
export const POST = async (req, res) => {
  const { userId, quote, tag } = await req.json();
  try {
    await connectToDB();
    const newQuote = new Quote({
      creator: userId,
      quote,
      tag,
    });
    await newQuote.save();
    return new Response(JSON.stringify(newQuote), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error?.message), { status: 500 });
  }
};
