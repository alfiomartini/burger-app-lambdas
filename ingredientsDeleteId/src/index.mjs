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
    await connection.query("delete from ingredient where ing_id = ?", [id]);
    // test if results is not empty
    response = {
      ...response,
      statusCode: 200,
      body: JSON.stringify(`Record successfully deleted`),
    };
  } catch (error) {
    console.log("delete ingredient/id", error);
    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify(`Internal server error`),
    };
  }
  console.log(response);
  return response;
};
