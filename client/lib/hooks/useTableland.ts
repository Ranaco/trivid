import { Database } from "@tableland/sdk";

const tableName: string = "healthbot_80001_1";

interface Schema {
  counter: number;
}

const db = new Database<Schema>();

const useTableDb = () => {
  const logData = async () => {
    const { results } = await db
      .prepare<Schema>(`SELECT * FROM ${tableName}`)
      .all();

    console.log(results);
  };

  logData();
};

export default useTableDb;
