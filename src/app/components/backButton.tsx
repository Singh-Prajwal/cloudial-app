"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
    >
      Back
    </button>
  );
}
