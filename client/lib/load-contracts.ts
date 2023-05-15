import TrividJson from "../build/Trivid.json";
import UserContractJson from "../build/TrividUserContract.json";

const loadContracts = async (web3: any) => {
  const TRIVID_ADD = process.env.TRIVID_ADD;
  const TRIVID_USER_ADD = process.env.TRIVID_USER_ADD;
  const TrividAbi: any = TrividJson.abi;
  const UserContractAbi: any = UserContractJson.abi;

  if (web3 !== undefined) {
    try {
      console.log("This is trivid address", TRIVID_ADD);
      const trivid = new web3.eth.Contract(TrividAbi, TRIVID_ADD);
      const userContract = new web3.eth.Contract(
        UserContractAbi,
        TRIVID_USER_ADD
      );
      return { trivid, userContract };
    } catch (err) {
      throw new Error(err);
    }
  }
};

export default loadContracts;
