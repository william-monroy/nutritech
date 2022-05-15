import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function FourOhFour() {
  return (
    <PageLayout>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </PageLayout>
  );
}
