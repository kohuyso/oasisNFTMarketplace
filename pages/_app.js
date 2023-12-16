import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Oasis_NFTMarketplaceProvider } from "../Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIProvider } from "@/Context/Oasis_APIContext";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
const App = ({ Component, pageProps }) => (
  <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
    <Oasis_APIProvider>
      <Oasis_NFTMarketplaceProvider>
        <ThemeProvider theme={createTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Oasis_NFTMarketplaceProvider>
    </Oasis_APIProvider>
  </ThirdwebProvider>
);

export default App;
