// Global styles.
import "@styles/globals.scss";
import "react-notifications-component/dist/theme.css";

// Dependencies.
import { ReactNotifications } from "react-notifications-component";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ReactNotifications />
      <Component {...pageProps} />
    </>
  );
}
