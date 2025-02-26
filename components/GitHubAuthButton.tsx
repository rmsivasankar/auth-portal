"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function GitHubAuthButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="w-full flex items-center justify-center gap-2 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition mt-3"
    >
      <FaGithub size={20} />
      Sign in with GitHub
    </button>
  );
}
