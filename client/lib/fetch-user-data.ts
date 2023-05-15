import { useReadDB } from "./hooks/useTableland";
import { TriUser } from "./types";

interface Props {
  address: string;
}

const fetchUserData = async ({ address }: Props): Promise<TriUser> => {
  let user: TriUser = {
    email: "",
    id: "",
    name: "",
    userName: "",
  };

  const result = await useReadDB({
    params: ["*"],
    qColumn: "id",
    qVal: String(address).substring(0, 10),
  });

  console.log(result[0]);

  user = result[0] as TriUser;

  return user;
};

export default fetchUserData;
