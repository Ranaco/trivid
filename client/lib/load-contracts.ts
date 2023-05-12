import Web3 from "web3";
import TrividJson from "../build/Trivid.json";
import UserContractJson from "../build/TrividUserContract.json";

const loadContracts = async (web3: Web3) => {
  const TRIVID_ADD = process.env.TRIVID_ADD;
  const TRIVID_USER_ADD = process.env.TRIVID_USER_ADD;
  const TrividAbi: any = TrividJson.abi;
  const UserContractAbi: any = UserContractJson.abi;

  if (web3 !== undefined) {
    try {
      const Trivid = new web3.eth.Contract(TrividAbi, TRIVID_ADD);
      const UserContract = new web3.eth.Contract(
        UserContractAbi,
        TRIVID_USER_ADD
      );
      console.log(
        "This is the trivid and userContract, ",
        Trivid,
        UserContract
      );
      return { Trivid, UserContract };
    } catch (err) {
      throw new Error(err);
    }
  }
};
