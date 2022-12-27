import "../styles/App.scss";
import { Dashboard, User } from "../Layout";
import type { AppProps } from "next/app";
export default function MyApp({ Component, pageProps, router }: AppProps) {
  const Layout = router?.pathname?.includes("dashboard") ? Dashboard : User;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

