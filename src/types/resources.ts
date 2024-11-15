export type ResourceId =
  | "Users"
  | "Files"
  | "Accounts"
  | "Contacts"
  | "Teams"
  | "Organizations"
  | "Authorities";

export type PermissionLevel = "NONE" | "READ" | "WRITE" | "ACCESS";

export const PermissionUtils = {
  canRead(permission: PermissionLevel): boolean {
    return (
      permission === "READ" || permission === "WRITE" || permission === "ACCESS"
    );
  },

  canWrite(permission: PermissionLevel): boolean {
    return permission === "WRITE" || permission === "ACCESS";
  },

  canAccess(permission: PermissionLevel): boolean {
    return permission === "ACCESS";
  },
};