import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
export const GET = async (req, res) => {
  // Disable caching
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  try {
    await connectToDB();
    const allQuoteData = await Quote.find({}).populate("creator");
    return new Response(JSON.stringify(allQuoteData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error?.message), { status: 500 });
  }
};
