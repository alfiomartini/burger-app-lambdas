import { connection } from "./client.mjs";

export const handler = async () => {
  let response = {};
  try {
    const id = 185;
    await connection.query("delete from ingredient where ing_id = ?", [id]);
    // test if results is not empty
    response = {
      statusCode: 200,
      body: JSON.stringify(`Record successfully deleted`),
    };
  } catch (error) {
    console.log("delete ingredient/id", error);
    response = {
      statusCode: 500,
      body: JSON.stringify(`Internal server error`),
    };
  }
  return response;
};
