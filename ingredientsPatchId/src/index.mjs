import { connection } from "./client.mjs";

export const handler = async () => {
  let response = {};
  const body = {
    name: "test",
    quantity: 350,
    description: "ml",
  };
  try {
    const id = 200;
    const { name, quantity, description } = body;
    await connection.query(
      `update ingredient 
        set name=?, quantity = ?, description=?
        where ing_id = ?`,
      [name, quantity, description, id]
    );
    response = {
      statusCode: 200,
      body: JSON.stringify({ id, name, quantity, description }),
    };
  } catch (error) {
    console.log("patch ingredient/id", error);
    response = {
      statusCode: 500,
      body: JSON.stringify("Internal server error"),
    };
  }
  return response;
};
