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

var Domain = newDomainTable("nuland", "domain", "")

type domainTable struct {
	postgres.Table

	// Columns
	ID        postgres.ColumnString
	UserID    postgres.ColumnString
	Name      postgres.ColumnString
	CreatedAt postgres.ColumnTimestamp
	DeletedAt postgres.ColumnTimestamp
	Favicon   postgres.ColumnString

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type DomainTable struct {
	domainTable

	EXCLUDED domainTable
}

// AS creates new DomainTable with assigned alias
func (a DomainTable) AS(alias string) *DomainTable {
	return newDomainTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new DomainTable with assigned schema name
func (a DomainTable) FromSchema(schemaName string) *DomainTable {
	return newDomainTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new DomainTable with assigned table prefix
func (a DomainTable) WithPrefix(prefix string) *DomainTable {
	return newDomainTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new DomainTable with assigned table suffix
func (a DomainTable) WithSuffix(suffix string) *DomainTable {
	return newDomainTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newDomainTable(schemaName, tableName, alias string) *DomainTable {
	return &DomainTable{
		domainTable: newDomainTableImpl(schemaName, tableName, alias),
		EXCLUDED:    newDomainTableImpl("", "excluded", ""),
	}
}

func newDomainTableImpl(schemaName, tableName, alias string) domainTable {
	var (
		IDColumn        = postgres.StringColumn("id")
		UserIDColumn    = postgres.StringColumn("user_id")
		NameColumn      = postgres.StringColumn("name")
		CreatedAtColumn = postgres.TimestampColumn("created_at")
		DeletedAtColumn = postgres.TimestampColumn("deleted_at")
		FaviconColumn   = postgres.StringColumn("favicon")
		allColumns      = postgres.ColumnList{IDColumn, UserIDColumn, NameColumn, CreatedAtColumn, DeletedAtColumn, FaviconColumn}
		mutableColumns  = postgres.ColumnList{UserIDColumn, NameColumn, CreatedAtColumn, DeletedAtColumn, FaviconColumn}
	)

	return domainTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:        IDColumn,
		UserID:    UserIDColumn,
		Name:      NameColumn,
		CreatedAt: CreatedAtColumn,
		DeletedAt: DeletedAtColumn,
		Favicon:   FaviconColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
