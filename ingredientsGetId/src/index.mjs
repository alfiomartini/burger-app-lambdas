import { connection } from "./client.mjs";

export const handler = async (event) => {
  let response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const id = event["path"].split("/")[2];
    const [results] = await connection.query(
      "select * from ingredient where ing_id = ?",
      [id]
    );

    // missing: test if results is not empty
    const castResult = results[0];
    response = {
      ...response,
      statusCode: 200,
      body: JSON.stringify({
        id: castResult.ing_id,
        name: castResult.name,
        quantity: castResult.quantity,
        description: castResult.description,
      }),
    };
  } catch (error) {
    console.log("get ingredient/id", error);
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  console.log(response);
  return response;
};
