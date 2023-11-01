"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { data: session, status } = useSession();

  var userOauth = null;

  if (status === "authenticated") {
    userOauth = session.user;
  }

  const handleLogout = async () => {
    localStorage.removeItem("userSession");
    await signOut();
  };

  const handleCreateAccount = async () => {
    const data = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.ok) {
      const res = await data.json();
      localStorage.setItem("userSession", JSON.stringify(res));
      alert("Account created successfully!");
      router.push("/login");
    } else {
      const errorMessage = await data.text();
      const error = JSON.parse(errorMessage);
      alert(error.error);
    }
  };

  const router = useRouter();
  var provider = null;
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function fetchProviders() {
      const tempData = localStorage.getItem("userSession");
      setUser(tempData ? JSON.parse(tempData) : null);
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
      {userOauth || user ? (
        <>
          <h1 className="text-lg">
            <span className="font-bold">User: </span>
            {userOauth?.email} {user?.email}
          </h1>
          <button
            class="text-gray-900 w-fit m-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="font-bold text-6xl mb-2 ">Signup</h1>
          <div className="flex flex-col justify-between h-fit">
            <div>
              <div>
                <label
                  htmlfor="gmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gmail
                </label>
                <input
                  type="text"
                  id="gmail"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlfor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="last_name"
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-blue-500"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                onClick={() => handleCreateAccount()}
                class="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Create Account
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
              onClick={() => router.push("/login")}
              className="px-8 py-3 text-white"
            >
              Already have an account?
            </button>
          </div>

          <div className="">
            <span className="font-bold">Test User: </span>admin@gmail.com
            admin@123
          </div>
        </>
      )}
    </main>
  );
}
