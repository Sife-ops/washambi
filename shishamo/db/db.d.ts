import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface ZoomersUser {
  id: Generated<string>;
  email: string;
  password: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface DB {
  "zoomers.user": ZoomersUser;
}
