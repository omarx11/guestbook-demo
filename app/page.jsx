import FormData from "./components/FormData";
import GuestbookMessages from "./components/GuestbookMessages";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="m-auto mt-8 max-w-3xl px-2 sm:px-0 md:mt-12">
      <Header />
      <div className="flex w-full items-center justify-center">
        <FormData />
      </div>
      <GuestbookMessages />
      <Footer />
    </main>
  );
}
