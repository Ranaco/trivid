import { ReactClient, StudioLivepeerProvider } from "@livepeer/react";

export type TriUser = {
  id: string;
  bio?: string;
  userName: string;
  name: string;
  profile?: string;
  email: string;
  stream?: string;
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
  key?: string;
  id: string;
  title: string;
  description: string;
  playbackId?: string;
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
