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

type ActionResultSuccess<DValue> = {
  status: "success";
  value?: string;
  message?: string;
  data: DValue;
  ok: true;
};

type ActionResultFailure = {
  status: "system_error" | "user_error";
  message: string;
  data?: undefined;
  ok: false;
};

export type ActionResult<DValue> =
  | ActionResultSuccess<DValue>
  | ActionResultFailure;

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
