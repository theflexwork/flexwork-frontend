import { notFound } from "next/navigation";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import TeamView from "@/components/teams/team-view";
import { findTeamById } from "@/lib/actions/teams.action";
import { deobfuscateToNumber } from "@/lib/endecode";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const team = await findTeamById(deobfuscateToNumber(params.teamId));
  if (!team) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Teams", link: "/portal/teams" },
    { title: team.name, link: "#" },
  ];

  return (
    <ContentLayout title="Teams">
      <Breadcrumbs items={breadcrumbItems} />
      <TeamView entity={team} />
    </ContentLayout>
  );
};

export default Page;
