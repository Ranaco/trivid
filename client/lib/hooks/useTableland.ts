import { Database, helpers } from "@tableland/sdk";
import { Wallet } from "ethers";
import { Schema } from "../types";

const privateKey: any = process.env.PRIVATE_KEY;
const HYPERSPACE_URL = process.env.HYPERSPACE_URL;

const wallet = new Wallet(privateKey);
const provider = helpers.getDefaultProvider(HYPERSPACE_URL);
const signer = wallet.connect(provider);

const TABLE_NAME: string = process.env.TABLE_NAME;

const db = new Database<Schema>({ signer });

interface InsertProps {
  params: any[];
  values: any[];
}

interface ReadProps {
  params: any[];
  qColumn?: string;
  qVal?: any;
  qCondition?: string;
}

export const useInsertDB = async ({ params, values }: InsertProps) => {
  if (params.length !== values.length) {
    throw new Error("Params and values' lengths are not equal");
  }

  const placeholders: string = values.map(() => "?").join(", ");
  const SQL: string = `INSERT INTO ${TABLE_NAME} (${params.join(
    ", "
  )}) VALUES (${placeholders})`;

  const { meta: insert } = await db.prepare(SQL).bind(values).run();
  return insert;
};

export const useReadDB = async ({
  params,
  qColumn,
  qVal,
  qCondition = "=",
}: ReadProps) => {
  const isAll: boolean = params.length === 1 && params[0] === "*";

  const fetchDb = async () => {
    const SQL: string = `SELECT ${
      isAll ? "*" : params.join(", ")
    } FROM ${TABLE_NAME} ${
      qColumn ? "WHERE " + [qColumn, qCondition, qVal].join(" ") : ""
    }`;

    const { results } = await db.prepare(SQL).all();

    return results;
    // return SQL;
  };
  return fetchDb();
};

export const dataBaseExists = async (signer: any) => {
  const ex = await helpers.extractBaseUrl({ signer });
  console.log(ex);
};
