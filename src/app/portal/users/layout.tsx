import React from "react";

import { ResourceProvider } from "@/providers/resource-provider";

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResourceProvider resourceId="Users">
      <div>{children}</div>
    </ResourceProvider>
  );
}