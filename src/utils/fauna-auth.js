import faunadb from "faunadb";

export const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_COVID_SECRET_KEY,
});
