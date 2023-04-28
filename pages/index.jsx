// Next.
import Head from "next/head";

// Layout.
import PublicLayout from "@layouts/PublicLayout";

// Components.
import SearchPlans from "@components/pages/index/SearchPlans";

export default function Index() {
  return (
    <>
      <Head>
        <title>Zip Code Application</title>
        <meta
          name="description"
          content="Web application to search for different volumes plans using your zip code."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicLayout>
        <SearchPlans />
      </PublicLayout>
    </>
  );
}
