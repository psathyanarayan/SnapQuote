import { connectToDB } from "@utils/database";
export const POST = async (req, res) => {
  const { userId, quote, tage } = await req.json();
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }
};
