import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Oasis_NFTMarketplaceProvider } from "../Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIProvider } from "@/Context/Oasis_APIContext";

const App = ({ Component, pageProps }) => (
  <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
    <Oasis_APIProvider>
      <Oasis_NFTMarketplaceProvider>
        <Component {...pageProps} />
      </Oasis_NFTMarketplaceProvider>
    </Oasis_APIProvider>
  </ThirdwebProvider>
);

export default App;
