import axios from "axios";

export default async function test(req, res) {
  try {
    axios.post(
      "https://api.zeit.co/v1/integrations/deploy/QmcxbXzxbUu8dP22WCs4nJtd1pLcetqZqhoKLtaVTEyMjt/h8HQqpH4Y7"
    );
    res.status(200).send("Success!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
