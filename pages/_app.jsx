// Global styles.
import "@styles/globals.scss";
import "react-notifications-component/dist/theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Dependencies.
import { ReactNotifications } from "react-notifications-component";

// Prevent fontawesome from adding its CSS automatically.
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

export default function App({ Component, pageProps }) {
  return (
    <>
      <ReactNotifications />
      <Component {...pageProps} />
    </>
  );
}
