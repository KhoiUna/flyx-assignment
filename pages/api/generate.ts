import { NextApiRequest, NextApiResponse } from "next";
import { formatData } from "../../helpers/helpers";
import generateNameEmail from "../../lib/generateNameEmail";
import saveToElastic from "../../lib/saveToElastic";

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

    const people = peopleArray.slice(0, 25);
    const customers = people.slice(0, 12);
    const employees = people.slice(12, 25);

    if (
      !(
        (await saveToElastic("customer", customers)) &&
        (await saveToElastic("employee", employees))
      )
    )
      return res.json({
        success: false,
        error: true,
      });

    return res.json({
      success: { employee: employees, customer: customers },
      error: false,
    });
  } catch (error) {
    console.error("Error in /generate", error);
    return res.status(500).json({ success: false, error: true });
  }
}
