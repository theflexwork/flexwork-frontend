/**
 * FW Commons data. Get the session data with code
 * const gwSession = useSession();
 */

type ISODateString = string;
export interface FwSession {
  user?: User;
  expires: ISODateString;
}

export interface User {
  id?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  createdDate?: ISODateString | null;
  lastModifiedDate?: ISODateString | null;
  authorities?: string[] | null;
}

export interface PageableResult<Entity> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Entity[];
}

export interface EntityValueDefinition {
  value: string;
  description?: string;
}

import { z } from "zod";

export const NotificationDTOSchema = z.object({
  id: z.number().nullable(),
  content: z.string(),
  createdAt: z.string(),
  userId: z.number(),
  isRead: z.boolean(),
});

export type NotificationDTO = z.infer<typeof NotificationDTOSchema>;

export const CommentDTOSchema = z.object({
  id: z.number().optional(),
  content: z.string().optional(),
  createdById: z.number(),
  createdByName: z.string().optional(),
  createdByImageUrl: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  entityType: z.string(),
  entityId: z.number(),
});

export type CommentDTO = z.infer<typeof CommentDTOSchema>;

export type EntityType = "Team_Request";
