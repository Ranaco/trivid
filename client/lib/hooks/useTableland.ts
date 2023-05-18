import { Database, helpers } from "@tableland/sdk";
import { Wallet } from "ethers";
import { TriUser } from "../types";

const privateKey: any = process.env.PRIVATE_KEY;
const HYPERSPACE_URL = process.env.HYPERSPACE_URL;

const wallet = new Wallet(privateKey);
const provider = helpers.getDefaultProvider(HYPERSPACE_URL);
const signer = wallet.connect(provider);

const TABLE_NAME: string = process.env.TABLE_NAME;

const db = new Database<TriUser>({ signer });

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

interface UpdateProps extends ReadProps {
  values?: any[];
}

export const useDeleteDB = async ({
  params,
  qColumn,
  qCondition = "=",
  qVal,
}: UpdateProps) => {
  const pairs: string = params.map((e) => `${e} = NULL`).join(", ");

  const SQL: string =
    `UPDATE ${TABLE_NAME} SET ${pairs} WHERE ` +
    [qColumn, qCondition, `'${qVal}'`].join(" ");
  const { meta: insert, error } = await db.prepare(SQL).run();
  if (error) {
    throw new Error(error);
  }
  console.log(SQL);
  console.log("Deleted ", insert);
};

export const useUpdateDB = async ({
  params,
  values,
  qColumn,
  qCondition = "=",
  qVal,
}: UpdateProps) => {
  if (params.length !== values.length) {
    throw new Error("Params and values' lengths are not equal");
  }

  const pairs: string = params
    .map((e, index) => `${e} = '${values[index]}'`)
    .join(", ");

  const SQL: string =
    `UPDATE ${TABLE_NAME} SET ${pairs} WHERE ` +
    [qColumn, qCondition, `'${qVal}'`].join(" ");
  const { meta: insert, error } = await db.prepare(SQL).run();
  if (error) {
    throw new Error(error);
  }
  window.alert("These are the insert details " + insert);
};

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
  const valIsString = typeof qVal === "string";
  const updatedVal = valIsString ? `'${qVal}'` : qVal;

  const fetchDb = async () => {
    const SQL: string = `SELECT ${
      isAll ? "* " : params.join(", ")
    }FROM ${TABLE_NAME} ${
      qColumn ? "WHERE " + [qColumn, qCondition, updatedVal].join(" ") : ""
    }`;

    const { results, error } = await db.prepare(SQL).all();
    console.log("This was the sql", SQL);

    console.log(results);
    return results;
  };
  return fetchDb();
};

export const dataBaseExists = async (signer: any) => {
  const ex = await helpers.extractBaseUrl({ signer });
  console.log(ex);
};
