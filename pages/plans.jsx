// Next.
import Head from "next/head";

// Layout.
import PrivateLayout from "@layouts/PrivateLayout";

// Components.
import Plans from "@components/pages/plans/Plans";

export default function PlansPage() {
  return (
    <>
      <Head>
        <title>Plans</title>
        <meta name="description" content="Manage your plans." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateLayout>
        <Plans />
      </PrivateLayout>
    </>
  );
}
