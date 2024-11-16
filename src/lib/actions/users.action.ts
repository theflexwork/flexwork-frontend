"use server";

import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import { redirect } from "next/navigation";

import { doAdvanceSearch, get, post } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { Filter, Pagination } from "@/types/query";
import { userSchema, UserType } from "@/types/users";

export async function searchUsers(
  filters: Filter[] = [],
  pagination: Pagination,
) {
  noStore();
  return doAdvanceSearch<UserType>(
    `${BACKEND_API}/api/users/search`,
    filters,
    pagination,
  );
}

export async function getUsersByAuthority(authority: string) {
  return get<Array<UserType>>(
    `${BACKEND_API}/api/users/authorities/${authority}`,
  );
}

export async function findUsersNotInAuthority(
  userTerm: string,
  authorityName: string,
) {
  return get<Array<UserType>>(
    `${BACKEND_API}/api/users/authorities/searchUsersNotInAuthority?userTerm=${userTerm}&&authorityName=${authorityName}`,
  );
}

export async function findUsersNotInTeam(userTerm: string, teamId: number) {
  return get<Array<UserType>>(
    `${BACKEND_API}/api/users/authorities/searchUsersNotInTeam?userTerm=${userTerm}&&teamId=${teamId}`,
  );
}

export const findUserById = async (userId: number) => {
  return get<UserType>(`${BACKEND_API}/api/users/${userId}`);
};

export const createUser = async (user: UserType) => {
  const validation = userSchema.safeParse(user);
  if (validation.success) {
    await post(`${BACKEND_API}/api/admin/users`, user);
    redirect("/portal/users");
  }
};

export const passwordReset = async (key: string, password: string) => {
  await post(
    `${BACKEND_API}/api/account/reset-password/finish`,
    { key: key, newPassword: password },
    false,
  );
};

export const forgotPassword = async (email: string) => {
  await get(
    `${BACKEND_API}/api/account/reset-password/init?email=${email}`,
    false,
  );
};
