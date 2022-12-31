import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({
  //   cloud: {
  //     id: process.env.ELASTIC_CLOUD_ID,
  //   },
  //   auth: {
  //     username: process.env.ELASTIC_USERNAME as string,
  //     password: process.env.ELASTIC_PASSWORD as string,
  //   },
  node: process.env.ELASTIC_NODE,
});

export default elasticClient;
