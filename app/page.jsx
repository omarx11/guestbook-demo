import Link from "next/link";
import FormData from "./components/FormData";
import GuestbookMessages from "./components/GuestbookMessages";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="m-auto mt-10 flex max-w-3xl flex-col items-center md:mt-16">
      <div className="mx-2 mb-2 text-center">
        <h1 className="pb-4 text-5xl font-bold md:text-6xl">
          Guestbook
          <span className="text-base"> Demo</span>
        </h1>
        <p className="text-sm text-gray-300 md:text-base">
          Hey There!, This is a simple guestbook project that was made using the
          latest technologies such as{" "}
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#EEEEEE"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z" />
          </svg>{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="hover:underline"
          >
            Next.js
          </Link>
          ,{" "}
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#06B6D4"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
          </svg>{" "}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            className="hover:underline"
          >
            TailwindCSS
          </Link>
          ,{" "}
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#3FCF8E"
            height="15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
          </svg>{" "}
          <Link
            href="https://supabase.com/"
            target="_blank"
            className="hover:underline"
          >
            Supabase
          </Link>
          , and{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="inline-block"
            color="#FFFFFF"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6.44" cy="11.33" r="2.17" />
              <path d="m8 9.8l3.86-3.86a.36.36 0 0 1 .51 0l1.13 1.15m-3.05.28l1.02 1.02M2 12.5h-.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1V4m-13-.5h13" />
            </g>
          </svg>{" "}
          <Link
            href="https://authjs.dev/"
            target="_blank"
            className="hover:underline"
          >
            NextAuth
          </Link>{" "}
          for the user login. 🔐
        </p>
      </div>
      <div className="flex h-[17rem] w-full items-center justify-center">
        <FormData />
      </div>
      <GuestbookMessages />
      <Footer />
    </main>
  );
}
