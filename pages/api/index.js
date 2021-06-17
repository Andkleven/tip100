import faunadb, {
  Client,
  Collection,
  Get,
  Lambda,
  Paginate,
  Map,
  Documents,
  Create,
} from "faunadb";
// const q = faunadb.query;

export const client = new Client({
  secret: "fnAEL5_98oACBZ46Zee7Nn0JwZbpL_1EOnj2_0DG",
});
// res.status(200).json({ name: "John Doe" });
// if (req.method === "POST") {
// }
// const data = JSON.parse(req.body);
export default function handler(req, res) {
  if (req.method === "GET") {
    client
      .query(
        Map(
          Paginate(Documents(Collection("tip"))),
          Lambda((x) => Get(x))
        )
      )
      .then((data) => {
        const newData = data.data.map((d) => {
          return { ...d.data, id: d.ref.id };
        });
        res.status(200).json(newData);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  } else if (req.method === "POST") {
    const data = JSON.parse(req.body);
    client
      .query(
        Create(Collection("tip"), {
          data,
        })
      )
      .then((ret) => {
        res.status(200).json({ ...ret.data, id: ret.ref.id });
      })
      .catch((e) => res.status(400).json(e));
  } else {
    res.status(400).json({ error: "only get and post" });
  }
}
