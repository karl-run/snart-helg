import "../styles/globals.css";

import type { AppProps } from "next/app";

import React from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "493807fafdc44cd8bb8ef13c64082007"}'
      />
    </>
  );
}

export default MyApp;
