import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=optional" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="description" content="Er det snart helg? Kanskje." />
        <meta property="og:url" content="https://helg.karl.run" />
        <meta property="og:title" content="Er det snart helg?" />
        <meta property="og:site_name" content="Snart Helg?" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
