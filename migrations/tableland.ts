import { Database, helpers } from "@tableland/sdk";
import { Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function CreateDB() {
  const privateKey: any = process.env.PRIVATE_KEY;
  const HYPERSPACE_URL = process.env.HYPERSPACE_URL;

  const wallet = new Wallet(privateKey);
  console.log("This is the wallet, ", wallet);
  const provider = helpers.getDefaultProvider(HYPERSPACE_URL);
  console.log("This is the provider ", provider);
  const signer = wallet.connect(provider);
  interface Schema {
    id: number;
    name: string;
    email: string;
    userName: string;
    bio: string;
    profile: string;
    stream: string;
    followersCount: number;
    followingCount: number;
    followers: string;
    following: string;
  }

  console.log(signer);

  const db = new Database<Schema>({ signer: signer });

  const prefix: string = "trivid";

  const { meta: create } = await db
    .prepare(
      `CREATE TABLE ${prefix} (
  id INT PRIMARY KEY,
  name TEXT,
  email TEXT,
  userName TEXT,
  bio TEXT,
  profile TEXT,
  stream TEXT,
  followersCount INT,
  followingCount INT,
  followers TEXT,
  following TEXT
);`
    )
    .run();

  console.log("This is the whole transaction ~ ", create.txn);
}

module.exports = CreateDB;
