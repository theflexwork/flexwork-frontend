import AccountForm from "@/components/accounts/account-form";
import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { findAccountById } from "@/lib/actions/accounts.action";
import { deobfuscateToNumber } from "@/lib/endecode";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
  { title: "Create", link: "/portal/accounts/new" },
];

export default async function Page({
  params,
}: {
  params: { accountId: string | "new" };
}) {
  const account =
    params.accountId !== "new"
      ? await findAccountById(deobfuscateToNumber(params.accountId))
      : undefined;

  return (
    <SimpleContentView title="Accounts" breadcrumbItems={breadcrumbItems}>
      <AccountForm initialData={account} />
    </SimpleContentView>
  );
}
