import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface NulandBookmark {
  id: Generated<string>;
  user_id: string;
  domain_id: string;
  description: string;
  url: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface NulandBookmarksTags {
  id: Generated<string>;
  bookmark_id: string;
  tag_id: string;
}

export interface NulandDomain {
  id: Generated<string>;
  user_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface NulandDomainsTags {
  id: Generated<string>;
  domain_id: string;
  tag_id: string;
}

export interface NulandField {
  id: Generated<string>;
  profile_id: string;
  name: string;
  hidden: Generated<boolean>;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface NulandFieldValue {
  id: Generated<string>;
  field_id: string;
  name: string;
  created_at: Generated<Timestamp>;
}

export interface NulandProfile {
  id: Generated<string>;
  domain_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface NulandTag {
  id: Generated<string>;
  user_id: string;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
  deleted_at: Timestamp | null;
}

export interface ZoomersUser {
  id: Generated<string>;
  email: string;
  password: string;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface DB {
  "nuland.bookmark": NulandBookmark;
  "nuland.bookmarks_tags": NulandBookmarksTags;
  "nuland.domain": NulandDomain;
  "nuland.domains_tags": NulandDomainsTags;
  "nuland.field": NulandField;
  "nuland.field_value": NulandFieldValue;
  "nuland.profile": NulandProfile;
  "nuland.tag": NulandTag;
  "zoomers.user": ZoomersUser;
}
