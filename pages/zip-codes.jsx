// Next.
import Head from "next/head";

// Layout.
import PrivateLayout from "@layouts/PrivateLayout";

// Components.
import ZipCodes from "@components/pages/zip-codes/ZipCodes";

export default function ZipCodesPage() {
  return (
    <>
      <Head>
        <title>Zip Codes</title>
        <meta name="description" content="Manage your zip codes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateLayout>
        <ZipCodes />
      </PrivateLayout>
    </>
  );
}
