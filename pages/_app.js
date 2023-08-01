import "@/styles/globals.css";
import { lightTheme } from "@/themes/light-theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
