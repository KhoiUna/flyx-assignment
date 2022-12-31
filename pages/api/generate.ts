import { NextApiRequest, NextApiResponse } from "next";
import { formatData } from "../../helpers/helpers";
import generateNameEmail from "../../lib/generateNameEmail";

type ApiResponse = {
  success: any;
  error: any;
};

export default async function generate(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const text = await generateNameEmail();
    const peopleArray = formatData(text as string);

    // TODO slice array and save to Elastic as `employees` or `customers`
    //

    return res.json({ success: peopleArray.slice(0, 25), error: false });
  } catch (error) {
    console.error("Error in /generate", error);
    return res.status(500).json({ success: false, error: true });
  }
}
