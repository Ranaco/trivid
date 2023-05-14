// import { Database, helpers } from "@tableland/sdk";
// import { Wallet } from "ethers";
// import * as dotenv from "dotenv";
// dotenv.config();
//
// const privateKey: any = process.env.PRIVATE_KEY;
// const HYPERSPACE_URL = process.env.HYPERSPACE_URL;
//
// const wallet = new Wallet(privateKey);
// const provider = helpers.getDefaultProvider(HYPERSPACE_URL);
// const signer = wallet.connect(provider);
//
// async function CreateDB() {
//   interface Schema {
//     id: number;
//     name: string;
//     email: string;
//     userName: string;
//     bio: string;
//     profile: string;
//     stream: string;
//     followersCount: number;
//     followingCount: number;
//     followers: string;
//     following: string;
//   }
//
//   console.log(signer);
//
//   const db = new Database<Schema>({ signer: signer });
//
//   const prefix: string = "trividDB";
//
//   const { meta: create } = await db
//     .prepare(
//       `CREATE TABLE ${prefix} (
//   id TEXT PRIMARY KEY,
//   name TEXT,
//   email TEXT,
//   userName TEXT,
//   bio TEXT,
//   profile TEXT,
//   stream TEXT,
//   followersCount INT,
//   followingCount INT,
//   followers TEXT,
//   following TEXT
// );`
//     )
//     .run();
//
//   console.log("This is the whole transaction ~ ", create.txn);
// }
//
// CreateDB();
//
// module.exports = CreateDB;
