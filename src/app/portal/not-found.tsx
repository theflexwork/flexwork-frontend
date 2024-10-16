"use client";

import { FrownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested entity.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors"
      >
        Go Back
      </Link>
    </main>
  );
}
