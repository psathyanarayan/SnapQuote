import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const quoteDataByUserId = await Quote.findById(params.id).populate(
      "creator"
    );
    if (!quoteDataByUserId) {
      return new Response("Quote not found", { status: 404 });
    }
    return new Response(JSON.stringify(quoteDataByUserId), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error?.message }), {
      status: 500,
    });
  }
};

export const PATCH = async (req, {params}) => {
  const { quote, tag } = await req.json();
  try {
    await connectToDB();
    const findObj = await Quote.findByIdAndUpdate(params.id, {
      quote: quote,
      tag: tag,
    });
    if (!findObj) {
      return new Response("Quote not found", { status: 404 });
    }
    return new Response({ message: "Updated successfully" }, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error?.message), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Quote.findByIdAndDelete({ creator: params.id });
    return new Response({ message: "Deleted successfully" }, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error?.message), { status: 500 });
  }
};
