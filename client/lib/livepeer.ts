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
      console.log("This is the livepeer key ", LIVEPEER_KEY);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return livepeerProvider;
};

export default useLivePeerService;
