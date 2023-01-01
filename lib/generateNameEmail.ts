import { Configuration, OpenAIApi } from "openai";

export default async function generateNameEmail() {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const prompt = "Generate 25 names with emails. Eg: fullname - email";
    const response = await openai.createCompletion({
      model: "text-curie-001",
      prompt,
      n: 1,
      max_tokens: 400,
      temperature: 0,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error generating names and emails", error);
    return;
  }
}
