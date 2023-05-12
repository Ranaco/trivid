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
import { AppContextState } from "../lib/types";
import Web3 from "web3";

interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface IProviderProps {
  children?: any;
}

export type AppContextValue = {
  wallet: AppContextState;
  setWallet: React.Dispatch<React.SetStateAction<AppContextState>>;
};

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
  };
  const [wallet, setWallet] = React.useState<AppContextState>(initialState);

  React.useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };

    console.log(wallet);

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        refreshAccounts(accounts);
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

  const updateWallet = async (accounts: any) => {
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
    setWallet({ account, balance, chainId });
  };

  const {
    Component,
    router,
    pageProps,
    emotionCache = localEmotionCache,
  } = props;

  const getLayout = Component.getLayout;

  return getLayout ? (
    getLayout(
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollBarStyle />
          <AppState.Provider value={{ wallet, setWallet }}>
            <Component {...pageProps} />
          </AppState.Provider>
        </ThemeProvider>
      </CacheProvider>
    )
  ) : (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollBarStyle />
        <AppState.Provider value={{ wallet, setWallet }}>
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </AppState.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
