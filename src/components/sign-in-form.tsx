"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export function SignInForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-light text-warm-900 text-center mb-8">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-warm-100 p-6 shadow-sm space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-warm-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-warm-200 bg-warm-50 text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-warm-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2.5 rounded-lg border border-warm-200 bg-warm-50 text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-400"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-sm text-ember-600 bg-ember-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-sage-500 text-white font-medium text-sm hover:bg-sage-600 disabled:opacity-50 transition-colors"
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create account"
              : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-warm-500 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-sage-600 hover:text-sage-700 font-medium"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>

        <div className="text-center mt-4">
          <a
            href="/"
            className="text-sm text-warm-400 hover:text-warm-600 transition-colors"
          >
            &larr; Back to today&rsquo;s prompt
          </a>
        </div>
      </motion.div>
    </div>
  );
}
