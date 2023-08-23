//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package table

import (
	"github.com/go-jet/jet/v2/postgres"
)

var BookmarksTags = newBookmarksTagsTable("nuland", "bookmarks_tags", "")

type bookmarksTagsTable struct {
	postgres.Table

	// Columns
	ID         postgres.ColumnString
	BookmarkID postgres.ColumnString
	TagID      postgres.ColumnString

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type BookmarksTagsTable struct {
	bookmarksTagsTable

	EXCLUDED bookmarksTagsTable
}

// AS creates new BookmarksTagsTable with assigned alias
func (a BookmarksTagsTable) AS(alias string) *BookmarksTagsTable {
	return newBookmarksTagsTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new BookmarksTagsTable with assigned schema name
func (a BookmarksTagsTable) FromSchema(schemaName string) *BookmarksTagsTable {
	return newBookmarksTagsTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new BookmarksTagsTable with assigned table prefix
func (a BookmarksTagsTable) WithPrefix(prefix string) *BookmarksTagsTable {
	return newBookmarksTagsTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new BookmarksTagsTable with assigned table suffix
func (a BookmarksTagsTable) WithSuffix(suffix string) *BookmarksTagsTable {
	return newBookmarksTagsTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newBookmarksTagsTable(schemaName, tableName, alias string) *BookmarksTagsTable {
	return &BookmarksTagsTable{
		bookmarksTagsTable: newBookmarksTagsTableImpl(schemaName, tableName, alias),
		EXCLUDED:           newBookmarksTagsTableImpl("", "excluded", ""),
	}
}

func newBookmarksTagsTableImpl(schemaName, tableName, alias string) bookmarksTagsTable {
	var (
		IDColumn         = postgres.StringColumn("id")
		BookmarkIDColumn = postgres.StringColumn("bookmark_id")
		TagIDColumn      = postgres.StringColumn("tag_id")
		allColumns       = postgres.ColumnList{IDColumn, BookmarkIDColumn, TagIDColumn}
		mutableColumns   = postgres.ColumnList{BookmarkIDColumn, TagIDColumn}
	)

	return bookmarksTagsTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:         IDColumn,
		BookmarkID: BookmarkIDColumn,
		TagID:      TagIDColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}