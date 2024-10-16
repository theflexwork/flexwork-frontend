import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { AccountsTable } from "@/components/accounts/account-table";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { searchAccounts } from "@/lib/actions/accounts.action";
import { cn } from "@/lib/utils";
import { accountSearchParamsSchema } from "@/types/accounts";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const AccountsPage = ({ searchParams }: paramsProps) => {
  const search = accountSearchParamsSchema.parse(searchParams);
  const accountPromise = searchAccounts(search);

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-card px-6 py-6">
        <div className="flex flex-row justify-between">
          <Heading title={`Accounts`} description="Manage accounts" />

          <Link
            href={"/portal/accounts/new/edit"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> New Account
          </Link>
        </div>
        <Separator />
        <AccountsTable
          accountsPromise={accountPromise}
          enableAdvancedFilter={true}
        />
      </div>
    </div>
  );
};

export default AccountsPage;
