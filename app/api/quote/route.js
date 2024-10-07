import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
export const revalidate = 0;
export const GET = async (req, res) => {


  try {

    await connectToDB();
    
    const allQuoteData = await Quote.find({}).populate("creator");
    return new Response(JSON.stringify(allQuoteData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error?.message), { status: 500 });
  }
};
