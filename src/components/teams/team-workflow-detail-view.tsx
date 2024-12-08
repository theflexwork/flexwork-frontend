"use client";

import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import { TeamAvatar } from "@/components/shared/avatar-display";
import TeamNavLayout from "@/components/teams/team-nav";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WorkflowDiagram } from "@/components/workflows/workflow-diagram-view";
import WorkflowEditForm from "@/components/workflows/workflow-editor-form";
import { usePagePermission } from "@/hooks/use-page-permission";
import { getWorkflowDetail } from "@/lib/actions/workflows.action";
import { obfuscate } from "@/lib/endecode";
import { BreadcrumbProvider } from "@/providers/breadcrumb-provider";
import { useTeam } from "@/providers/team-provider";
import { useUserTeamRole } from "@/providers/user-team-role-provider";
import { PermissionUtils } from "@/types/resources";
import { WorkflowDetailDTO } from "@/types/workflows";

const TeamWorkflowDetailView = ({ workflowId }: { workflowId: number }) => {
  const team = useTeam();
  const [workflowDetail, setWorkflowDetail] =
    useState<WorkflowDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const permissionLevel = usePagePermission();
  const teamRole = useUserTeamRole().role;

  useEffect(() => {
    async function fetchWorkflowDetail() {
      setLoading(true);
      getWorkflowDetail(workflowId)
        .then((data) => setWorkflowDetail(data))
        .finally(() => setLoading(false));
    }

    fetchWorkflowDetail();
  }, [workflowId]);

  const handleFormChange = (updatedWorkflow: WorkflowDetailDTO) => {
    setWorkflowDetail(updatedWorkflow);
  };

  if (!workflowDetail) {
    return <div>Error loading workflow detail.</div>;
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Teams", link: "/portal/teams" },
    {
      title: workflowDetail.ownerName!,
      link: `/portal/teams/${obfuscate(workflowDetail.ownerId)}`,
    },
    {
      title: "Workflows",
      link: `/portal/teams/${obfuscate(workflowDetail.ownerId)}/workflows`,
    },
    { title: workflowDetail.name, link: "#" },
  ];

  return (
    <BreadcrumbProvider items={breadcrumbItems}>
      <TeamNavLayout teamId={workflowDetail.ownerId!}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <TeamAvatar imageUrl={team.logoUrl} size="w-20 h-20" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-left">
                    <p className="font-bold">{team.name}</p>
                    <p className="text-sm text-gray-500">
                      {team.slogan ?? "Stronger Together"}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Heading
                title={workflowDetail.name}
                description={workflowDetail.description ?? ""}
              />
            </div>
            {(PermissionUtils.canWrite(permissionLevel) ||
              teamRole === "Manager") && (
              <div>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel Edit" : <Edit />} Customize Workflow
                </Button>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-4">
              <Spinner>
                <span>Loading workflow detail...</span>
              </Spinner>
            </div>
          )}

          {isEditing && workflowDetail && !loading && (
            <WorkflowEditForm
              workflowDetail={workflowDetail}
              onCancel={() => setIsEditing(false)}
              onSave={handleFormChange}
            />
          )}

          {workflowDetail && !loading && (
            <WorkflowDiagram workflowDetails={workflowDetail} />
          )}
        </div>
      </TeamNavLayout>
    </BreadcrumbProvider>
  );
};

export default TeamWorkflowDetailView;
