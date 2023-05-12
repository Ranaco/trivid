export type AppContextState = {
  account: string;
  balance: string;
  chainId: number;
  handleConnect?: any;
  trivid?: any;
  uesrContract?: any;
};

export type FormSchema = {
  name: string;
  userName: string;
  bio?: string;
  email: string;
  profile?: File;
};

export type Schema = {
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
};

export type previewtype = {
  title: string;
  creator: string;
  tags: string[];
  image: staticimagedata | string;
};

export type WindowDimensionType = {
  width: number;
  height: number;
};
