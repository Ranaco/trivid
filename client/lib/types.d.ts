import { ReactClient, StudioLivepeerProvider } from "@livepeer/react";

export type User = {
  id: string;
  userName: string;
  name: string;
  profile?: string;
  email: string;
  followersCount?: number;
  followingCount?: number;
  followers?: string;
  following?: string;
};

export type AppContextState = {
  account: string;
  balance: string;
  chainId: number;
  handleConnect?: any;
  trivid?: any;
  userContract?: any;
  user?: User;
};

export type LivepeerStream = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export type AppContextValue = {
  wallet: AppContextState;
  setWallet: React.Dispatch<React.SetStateAction<AppContextState>>;
};

export type FormSchema = {
  name: string;
  userName: string;
  bio?: string;
  email: string;
  profile?: File;
};

export type Schema = {
  id: string;
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
