import elasticClient from "../db/client";

export default async function saveToElastic(
  type: "employee" | "customer",
  dataset: string[]
) {
  try {
    const operations = dataset.flatMap((doc) => [
      { index: { _index: type } },
      {
        name_email: doc,
      },
    ]);

    const bulkResponse = await elasticClient.bulk({
      refresh: true,
      operations,
    });

    if (bulkResponse.errors) throw new Error("Error saving to Elastic");

    return true;
  } catch (error) {
    console.error("Error saving to Elastic", error);
    return false;
  }
}
