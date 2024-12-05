import { notFound } from "next/navigation";
import React from "react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import TeamWorkflowsView from "@/components/teams/team-workflows";
import { findTeamById } from "@/lib/actions/teams.action";
import { deobfuscateToNumber } from "@/lib/endecode";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const team = await findTeamById(deobfuscateToNumber(params.teamId));
  if (!team) {
    notFound();
  }

  return (
    <ContentLayout title="Teams">
      <TeamWorkflowsView entity={team} />
    </ContentLayout>
  );
};

export default Page;
