import { connection } from "./client.mjs";

export const handler = async () => {
  let response = {};
  try {
    const body = {
      name: "test",
      quantity: "250",
      description: "grams",
    };
    const { name, quantity, description } = body;
    const [result] = await connection.query(
      `insert into ingredient (name, quantity, description)
       values(?,?,?)`,
      [name, quantity, description]
    );
    response = {
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
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  return response;
};
