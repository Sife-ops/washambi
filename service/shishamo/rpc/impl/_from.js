import timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb.js";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
const { Timestamp } = timestamp_pb;

/**
 * @param {import("kysely").Selectable<import("@db/db.d.ts").NulandDomain>} d
 * @returns {shishamo_pb.Domain}
 */
export function domainFromDb(d) {
    const domain = new shishamo_pb.Domain();

    domain.setId(d.id);
    domain.setUserId(d.user_id);
    domain.setName(d.name);
    domain.setCreatedAt(Timestamp.fromDate(d.created_at));
    if (d.deleted_at) {
        domain.setDeletedAt(Timestamp.fromDate(d.deleted_at));
    }

    return domain;
}

/**
 * @param {import("kysely").Selectable<import("@db/db.d.ts").NulandBookmark>} b
 * @returns {shishamo_pb.Bookmark}
 */
export function bookmarkFromDb(b) {
    const bookmark = new shishamo_pb.Bookmark();

    bookmark.setId(b.id);
    bookmark.setUserId(b.user_id);
    bookmark.setDomainId(b.domain_id);
    bookmark.setDescription(b.description);
    bookmark.setUrl(b.url);
    bookmark.setCreatedAt(Timestamp.fromDate(b.created_at));
    if (b.deleted_at) {
        bookmark.setDeletedAt(Timestamp.fromDate(b.deleted_at));
    }

    return bookmark;
}

