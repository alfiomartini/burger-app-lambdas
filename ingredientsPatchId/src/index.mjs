import { connection } from "./client.mjs";

export const handler = async (event) => {
  let response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const body = JSON.parse(event["body"]);
  try {
    const id = event["path"].split("/")[2];
    const { name, quantity, description } = body;
    await connection.query(
      `update ingredient 
        set name=?, quantity = ?, description=?
        where ing_id = ?`,
      [name, quantity, description, id]
    );
    response = {
      ...response,
      statusCode: 200,
      body: JSON.stringify({ id, name, quantity, description }),
    };
  } catch (error) {
    console.log("patch ingredient/id", error);
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  console.log(response);
  return response;
};
