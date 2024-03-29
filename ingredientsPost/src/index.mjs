import { connection } from "./client.mjs";

export const handler = async (event) => {
  let response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const { name, quantity, description } = JSON.parse(event["body"]);
    const [result] = await connection.query(
      `insert into ingredient (name, quantity, description)
       values(?,?,?)`,
      [name, quantity, description]
    );
    response = {
      ...response,
      statusCode: 201,
      body: JSON.stringify({
        id: result.insertId,
        name,
        quantity,
        description,
      }),
    };
  } catch (error) {
    console.log("post ingredient", error);
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  console.log(response);
  return response;
};
