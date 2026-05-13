"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";

export default function Home() {
  const [status, setStatus] = useState<string>("Connecting to backend...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to connect to backend. Make sure the server is running on port 5000.");
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 bg-white dark:bg-zinc-900 p-12 rounded-2xl shadow-xl">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={24}
          priority
        />
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hackathon Project
          </h1>
          
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            Backend Status: {status}
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <p className="max-w-md text-zinc-600 dark:text-zinc-400 mt-6 leading-relaxed">
            Your frontend is now configured to talk to your Express backend.
            Environment variables are set in <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">Client/.env</code>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="/docs"
            className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium transition hover:opacity-80"
          >
            Go to App
          </a>
          <a
            href="https://github.com/Fu56/Hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            GitHub Repo
          </a>
        </div>
      </main>
    </div>
  );
}

