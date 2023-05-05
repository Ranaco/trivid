import * as React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "../lib/createEmotionCache";
import Layout, { ScrollBarStyle } from "../components/layouts/main";
import theme from "../lib/theme";

interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const localEmotionCache = createEmotionCache();

const App: React.FC<EmotionAppProps> = (props) => {
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
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
