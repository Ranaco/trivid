import { NextApiResponse, NextApiRequest } from "next";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
const token = process.env.SPHERON_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucketName = "trivid";
  const protocol = ProtocolEnum.FILECOIN;

  try {
    const spheronClient = new SpheronClient({ token: token });
    const { uploadToken } = await spheronClient.createSingleUploadToken({
      name: bucketName,
      protocol,
    });

    res.status(200).send({
      uploadToken,
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

export default handler;
