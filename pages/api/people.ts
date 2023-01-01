import { NextApiRequest, NextApiResponse } from "next";
import elasticClient from "../../db/client";

type Person = {
  _index: string;
  _id: string;
  _score: number;
  _source: {
    name_email: string;
  };
};

type ApiResponse = {
  success: any;
  error: any;
};

export default async function generate(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const response = await elasticClient.search({
      index: "employee",
      query: {
        match_all: {},
      },
    });

    const people = response.hits.hits as Person[];

    return res.json({ success: people, error: false });
  } catch (error) {
    console.error("Error in /generate", error);
    return res.status(500).json({ success: false, error: true });
  }
}
