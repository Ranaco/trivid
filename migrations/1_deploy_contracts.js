const Trivid = artifacts.require("Trivid");
const UserContract = artifacts.require("TrividUserContract");
const CreateDB = require("./tableland.ts");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = async (deployer) => {
  deployer.deploy(Trivid).then((e) => {
    return deployer.deploy(
      UserContract,
      Trivid.address,
      "0xA9605c1819BF88140b0B8C6DBaC52A71746E3dB2"
    );
  });
};
