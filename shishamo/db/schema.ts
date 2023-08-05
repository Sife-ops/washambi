import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Bookmark {
  id: Generated<string>;
  user_id: string;
  domain_id: string | null;
  name: string;
  url: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface Domain {
  id: Generated<string>;
  user_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface Field {
  id: Generated<string>;
  profile_id: string;
  name: string;
  hidden: Generated<boolean>;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface FieldValue {
  id: Generated<string>;
  field_id: string;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface Profile {
  id: Generated<string>;
  domain_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface User {
  id: Generated<string>;
  email: string;
  password: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface DB {
  bookmark: Bookmark;
  domain: Domain;
  field: Field;
  field_value: FieldValue;
  profile: Profile;
  user: User;
}
