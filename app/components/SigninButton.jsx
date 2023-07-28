"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninButton() {
  const [isLoading, setIsLoading] = useState("");

  return (
    <div className="flex w-11/12 flex-row flex-wrap items-center justify-center gap-4 rounded-md bg-neutral-800 py-4 text-center">
      <p>Sign In with:</p>
      <button
        aria-label="Sign in with Github"
        onClick={() => {
          signIn("github");
          setIsLoading("github");
        }}
        className="flex items-center gap-1 rounded-lg bg-[#2f3338] px-2 py-2 text-lg font-bold duration-100 hover:bg-[#2f3338]/80"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
         Github
        {isLoading === "github" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="animate-spin"
          >
            <g fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                clipRule="evenodd"
                opacity=".2"
              />
              <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
            </g>
          </svg>
        )}
      </button>
      <button
        aria-label="Sign in with google"
        onClick={() => {
          signIn("google");
          setIsLoading("google");
        }}
        className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-2 text-lg font-bold duration-100 hover:bg-blue-700"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
        </svg>
         Google
        {isLoading === "google" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="animate-spin"
          >
            <g fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                clipRule="evenodd"
                opacity=".2"
              />
              <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
            </g>
          </svg>
        )}
      </button>
      <p className="flex items-center gap-2 text-sm text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="hidden md:block"
        >
          <path
            fill="#aaa"
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
          />
        </svg>
        your login information only used to display your name, avatar.
      </p>
    </div>
  );
}
