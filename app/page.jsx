import FormData from "./components/FormData";
import GuestbookMessages from "./components/GuestbookMessages";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="m-auto mt-10 flex max-w-3xl flex-col items-center md:mt-16">
      <Header />
      <div className="flex h-60 w-full items-center justify-center">
        <FormData />
      </div>
      <GuestbookMessages />
      <Footer />
    </main>
  );
}
