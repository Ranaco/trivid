import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
  LivepeerProvider,
  ReactClient,
  StudioLivepeerProvider,
  defaultQueryClient,
} from "@livepeer/react";
import * as React from "react";

const LIVEPEER_KEY = process.env.LIVEPEER_KEY;

const useLivePeerService = () => {
  const [livepeerProvider, setLivepeerProvider] = React.useState<
    ReactClient<StudioLivepeerProvider> | undefined
  >(undefined);

  React.useEffect(() => {
    try {
      const client = createReactClient({
        provider: studioProvider({
          apiKey: LIVEPEER_KEY,
        }),
      });
      setLivepeerProvider(client);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return livepeerProvider;
};

export default useLivePeerService;
