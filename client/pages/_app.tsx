import * as React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../lib/createEmotionCache";
import Layout, { ScrollBarStyle } from "../components/layouts/main";
import theme from "../lib/theme";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, formatChainAsNum } from "../lib/hooks/utils/format";
import "../styles/globals.css";
import { AppContextState, AppContextValue } from "../lib/types";
import Web3 from "web3";
import loadContracts from "../lib/load-contracts";
import { useReadDB } from "../lib/hooks/useTableland";
import useLivePeerService from "../lib/livepeer";
import { LivepeerConfig } from "@livepeer/react";

interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface IProviderProps {
  children?: any;
}

export const AppState = React.createContext<AppContextValue | undefined>(
  undefined
);

const localEmotionCache = createEmotionCache();

const App: React.FC<EmotionAppProps> = (props) => {
  const handleConnect = async () => {
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: []) => {
        updateWallet(accounts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const initialState: AppContextState = {
    account: "",
    balance: "",
    chainId: 0,
    handleConnect: handleConnect,
    trivid: null,
    userContract: null,
  };
  const [wallet, setWallet] = React.useState<AppContextState>(initialState);

  React.useEffect(() => {
    const refreshAccounts = (accounts: any, trivid: any, userContract: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts, trivid, userContract);
      } else {
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((val) => ({ ...val, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(provider as any);
        const { trivid, userContract } = await loadContracts(web3);
        refreshAccounts(accounts, trivid, userContract);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    if (!wallet.account) {
      router.replace("/login");
    }

    setWallet((props) => ({ handleConnect: handleConnect, ...props }));

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, [wallet.account]);

  const updateWallet = async (
    accounts: any,
    trivid?: any,
    userContract?: any
  ) => {
    const balance = formatBalance(
      await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = formatChainAsNum(
      await window.ethereum!.request({
        method: "eth_chainId",
      })
    );
    const account = accounts[0];
    const isRegistered = await userContract.methods
      .isRegistered(account)
      .call();
    setWallet((val) => ({
      ...val,
      account,
      balance,
      chainId,
      userContract,
      trivid,
    }));
    console.log(wallet);
    if (!isRegistered) {
      router.replace("/register");
    } else {
      //TODO:: Implement DB
    }
  };

  const {
    Component,
    router,
    pageProps,
    emotionCache = localEmotionCache,
  } = props;

  const getLayout = Component.getLayout;
  const client = useLivePeerService();
  console.log(client);

  return getLayout ? (
    getLayout(
      <LivepeerConfig client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollBarStyle />
          <AppState.Provider value={{ wallet, setWallet }}>
            <Component {...pageProps} />
          </AppState.Provider>
        </ThemeProvider>
      </LivepeerConfig>
    )
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollBarStyle />
      <AppState.Provider value={{ wallet, setWallet }}>
        <Layout router={router}>
          <LivepeerConfig client={client}>
            <Component {...pageProps} />
          </LivepeerConfig>
        </Layout>
      </AppState.Provider>
    </ThemeProvider>
  );
};

export default App;
