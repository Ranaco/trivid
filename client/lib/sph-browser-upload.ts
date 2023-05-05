import { upload } from "@spheron/browser-upload";

interface Props {
  file: File[];
  onChunkUploaded(uploadedSize: number, totalSize: number): void;
}

const uploadToIpfs = async ({
  file,
  onChunkUploaded,
}: Props): Promise<{
  bucketId: string;
  dynamicLinks: string[];
  protocolLink: string;
  uploadId: string;
}> => {
  const apiRes = await fetch("http://localhost:3000/api/store");
  const resJson = await apiRes.json();
  const token = resJson.uploadToken;

  const { bucketId, dynamicLinks, protocolLink, uploadId } = await upload(
    file,
    {
      token,
      onChunkUploaded: onChunkUploaded,
    }
  );

  return { bucketId, dynamicLinks, protocolLink, uploadId };
};

export default uploadToIpfs;
