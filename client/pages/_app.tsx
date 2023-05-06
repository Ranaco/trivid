import * as React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../lib/createEmotionCache";
import Layout, { ScrollBarStyle } from "../components/layouts/main";
import theme from "../lib/theme";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../lib/hooks/utils/format";

interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface IProviderProps {
  children?: any;
}

type AppContextState = {
  account: string;
  balance: string;
  chainId: number;
  handleConnect: any;
};

export type AppContextValue = {
  wallet: AppContextState;
  setWallet: React.Dispatch<React.SetStateAction<AppContextState>>;
};

export const AppState = React.createContext<AppContextValue | undefined>(
  undefined
);

const localEmotionCache = createEmotionCache();

const App: React.FC<EmotionAppProps> = (props) => {
  const initialState: AppContextState = {
    account: "",
    balance: "",
    chainId: 0,
    handleConnect: undefined,
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

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    const balance = formatBalance(
      await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    });
    const account = accounts[0];
    setWallet({ account, balance, chainId, handleConnect: handleConnect });
  };

  const handleConnect = async () => {
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: []) => {
        updateWallet(accounts);
      })
      .catch((err: any) => {});
  };

  const {
    Component,
    router,
    pageProps,
    emotionCache = localEmotionCache,
  } = props;

  return (
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
