import { redirectIfLoggedIn } from "@/composables/utility";
import Hero from "../components/Hero";
export default async function HomePage() {
  await redirectIfLoggedIn();

  return (
    <main className="p-8">
      <Hero />
    </main>
  );
}
