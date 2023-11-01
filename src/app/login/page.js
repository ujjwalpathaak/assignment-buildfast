"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [providers, setProviders] = useState([]);

  var provider = null;

  const checkIfUserExists = async () => {
    const data = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.ok) {
      const res = await data.json();
      const user = res.user;
      localStorage.setItem("userSession", JSON.stringify(user));
      router.push("/");
      ``;
    } else {
      const errorMessage = await data.text();
      const error = JSON.parse(errorMessage);
      alert(error.error);
    }
  };

  useEffect(() => {
    async function fetchProviders() {
      const res = await fetch("/api/auth/providers");
      const providerData = await res.json();
      setProviders(providerData);
    }

    fetchProviders();
  }, []);

  if (!providers) {
    return <></>;
  } else {
    provider = Object.values(providers)[0];
  }

  return (
    <main className="text-white flex flex-col justify-center items-center w-[100vw] h-[100vh]">
      <h1 className="font-bold text-6xl mb-2 ">Login</h1>
      <div className="flex flex-col justify-between h-fit">
        <div>
          <div>
            <label
              for="gmail"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gmail
            </label>
            <input
              type="text"
              id="gmail"
              onChange={(e) => setEmail(e.target.value)}
              class="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="last_name"
              class="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="********"
              required
            />
          </div>
          <button
            onClick={() => checkIfUserExists()}
            class="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login
          </button>
        </div>
        <span className="text-xl font-bold w-full text-center">or</span>
        <div className="mt-2">
          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 w-full border flex gap-2 border-slate-200 rounded-lg bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <Image
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={50}
              height={50}
            />
            <span>Get Started</span>
          </button>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 text-white"
        >
          Don't have an account?
        </button>
      </div>
      <div className="">
        <span className="font-bold">Test User: </span>admin@gmail.com admin@123
      </div>
    </main>
  );
};

export default page;
