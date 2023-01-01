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
    // TODO: fix
    const text = await generateNameEmail();
    console.log(text);

    const peopleArray = formatData(text as string);

    const people = peopleArray.slice(0, 25);
    const customers = people.slice(0, 11);
    const employees = people.slice(11, 24);

    return res.json({
      success: { employee: employees, customer: customers },
      error: false,
    });
  } catch (error) {
    console.error("Error in /generate", error);
    return res.status(500).json({ success: false, error: true });
  }
}
