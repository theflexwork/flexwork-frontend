"use client";

import { Edit, Ellipsis, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import AddUserToAuthorityDialog from "@/components/authorities/authority-add-user-dialog";
import { Heading } from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewProps } from "@/components/ui/ext-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DefaultUserLogo from "@/components/users/user-logo";
import { usePagePermission } from "@/hooks/use-page-permission";
import {
  deleteUserFromAuthority,
  findPermissionsByAuthorityName,
} from "@/lib/actions/authorities.action";
import { getUsersByAuthority } from "@/lib/actions/users.action";
import { obfuscate } from "@/lib/endecode";
import {
  AuthorityResourcePermissionType,
  AuthorityType,
} from "@/types/authorities";
import { PermissionUtils } from "@/types/resources";
import { UserType } from "@/types/users";

export const AuthorityView: React.FC<ViewProps<AuthorityType>> = ({
  entity,
}: ViewProps<AuthorityType>) => {
  const permissionLevel = usePagePermission();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Array<UserType>>();
  const [authority, setAuthority] = useState<AuthorityType>(entity);
  const [resourcePermissions, setResourcePermissions] =
    useState<Array<AuthorityResourcePermissionType>>();

  const router = useRouter();

  async function fetchUsers() {
    const userData = await getUsersByAuthority(authority.name);
    setUsers(userData);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchResourcePermissions() {
      const resourcePermissionsResult = await findPermissionsByAuthorityName(
        authority.name,
      );
      setResourcePermissions(resourcePermissionsResult);
    }
    fetchResourcePermissions();
  }, []);

  async function removeUserOutAuthority(user: UserType) {
    await deleteUserFromAuthority(authority.name, user.id!);
    await fetchUsers();
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="flex flex-row justify-between">
        <Heading
          title={authority.descriptiveName}
          description={authority.description ?? ""}
        />
        {PermissionUtils.canWrite(permissionLevel) && (
          <div className="flex space-x-4">
            <Button onClick={() => setOpen(true)}>
              <Plus /> Add User
            </Button>
            <AddUserToAuthorityDialog
              open={open}
              setOpen={setOpen}
              authorityEntity={authority}
              onSaveSuccess={() => fetchUsers()}
            />
            <Button
              onClick={() =>
                router.push(
                  `/portal/settings/authorities/${obfuscate(authority.name)}/edit`,
                )
              }
            >
              <Edit /> Edit
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 items-start">
        <div className="md:flex-1 flex flex-row flex-wrap gap-4 w-full">
          {users?.map((user: UserType) => (
            <div
              className="w-full md:w-[24rem] flex flex-row gap-4 border border-gray-200 px-4 py-4 rounded-2xl relative"
              key={user.id}
            >
              <div>
                <Avatar className="size-24 cursor-pointer ">
                  <AvatarImage
                    src={
                      user?.imageUrl ? `/api/files/${user.imageUrl}` : undefined
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback>
                    <DefaultUserLogo />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="text-xl">
                  <Button variant="link" asChild className="px-0">
                    <Link href={`/portal/users/${obfuscate(user.id)}`}>
                      {user.firstName}, {user.lastName}
                    </Link>
                  </Button>
                </div>
                <div>
                  <b>Email:</b>{" "}
                  <Link href={`mailto:${user.email}`}>{user.email}</Link>
                </div>
              </div>
              {PermissionUtils.canWrite(permissionLevel) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis className="cursor-pointer absolute top-2 right-2 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[14rem] w-full">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => removeUserOutAuthority(user)}
                          >
                            <Trash /> Remove user
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            This action will revoke the selected user’s access
                            and permissions associated with this authority
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
        <Card className="w-full md:w-[28rem] mt-4 md:mt-0">
          <CardHeader>Resource Permissions</CardHeader>
          <CardContent>
            <div>
              {resourcePermissions ? (
                resourcePermissions.map((perm, index) => (
                  <div key={index} className="p-4 rounded shadow">
                    <p>
                      <strong>Resource:</strong> {perm.resourceName}
                    </p>
                    <p>
                      <strong>Permission:</strong> {perm.permission}
                    </p>
                  </div>
                ))
              ) : (
                <p>No permissions available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};