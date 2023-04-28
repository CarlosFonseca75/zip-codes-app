// Next.
import Head from "next/head";

// Layout.
import PrivateLayout from "@layouts/PrivateLayout";

// Components.
import Prices from "@components/pages/prices/Prices";

export default function PricesPage() {
  return (
    <>
      <Head>
        <title>Prices</title>
        <meta name="description" content="Manage your prices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateLayout>
        <Prices />
      </PrivateLayout>
    </>
  );
}
