import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID as string,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME as string,
    password: process.env.ELASTIC_PASSWORD as string,
  },
});

export default elasticClient;
