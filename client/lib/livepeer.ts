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
    const setupClient = async () => {
      try {
        const client = React.useMemo(() => {
          return createReactClient({
            provider: studioProvider({
              apiKey: LIVEPEER_KEY,
              baseUrl: "test_stream",
            }),
          });
        }, []);
        console.log(LIVEPEER_KEY);
        setLivepeerProvider(client);
      } catch (err) {
        console.log("Some error");
      }
    };
    setupClient();
  }, []);
  return livepeerProvider;
};

export default useLivePeerService;
