import { connection } from "./client.mjs";

export const handler = async () => {
  let response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const [results] = await connection.query("select * from ingredient");
    if (Array.isArray(results)) {
      const normalized = results.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        description: item.description,
        id: item.ing_id,
      }));
      response = {
        ...response,
        statusCode: 200,
        body: JSON.stringify(normalized),
      };
    } else {
      response = {
        ...response,
        statusCode: 500,
        body: JSON.stringify("Internal server error"),
      };
    }
  } catch (error) {
    console.log("get all ingredients", error);
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  console.log(response);
  return response;
};
