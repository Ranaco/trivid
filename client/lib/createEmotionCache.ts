import createCache, { EmotionCache } from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

const createEmotionCache = () => {
  let insertionPoint: HTMLMetaElement | undefined;

  if (isBrowser) {
    const cacheInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = cacheInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
};

export default createEmotionCache;
