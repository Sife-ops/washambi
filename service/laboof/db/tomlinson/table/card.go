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

var Card = newCardTable("tomlinson", "card", "")

type cardTable struct {
	postgres.Table

	// Columns
	ID          postgres.ColumnString
	KanbanID    postgres.ColumnString
	SwimlaneID  postgres.ColumnString
	Name        postgres.ColumnString
	Description postgres.ColumnString
	Details     postgres.ColumnString
	CreatedAt   postgres.ColumnTimestamp
	UpdatedAt   postgres.ColumnTimestamp
	DeletedAt   postgres.ColumnTimestamp

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type CardTable struct {
	cardTable

	EXCLUDED cardTable
}

// AS creates new CardTable with assigned alias
func (a CardTable) AS(alias string) *CardTable {
	return newCardTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new CardTable with assigned schema name
func (a CardTable) FromSchema(schemaName string) *CardTable {
	return newCardTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new CardTable with assigned table prefix
func (a CardTable) WithPrefix(prefix string) *CardTable {
	return newCardTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new CardTable with assigned table suffix
func (a CardTable) WithSuffix(suffix string) *CardTable {
	return newCardTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newCardTable(schemaName, tableName, alias string) *CardTable {
	return &CardTable{
		cardTable: newCardTableImpl(schemaName, tableName, alias),
		EXCLUDED:  newCardTableImpl("", "excluded", ""),
	}
}

func newCardTableImpl(schemaName, tableName, alias string) cardTable {
	var (
		IDColumn          = postgres.StringColumn("id")
		KanbanIDColumn    = postgres.StringColumn("kanban_id")
		SwimlaneIDColumn  = postgres.StringColumn("swimlane_id")
		NameColumn        = postgres.StringColumn("name")
		DescriptionColumn = postgres.StringColumn("description")
		DetailsColumn     = postgres.StringColumn("details")
		CreatedAtColumn   = postgres.TimestampColumn("created_at")
		UpdatedAtColumn   = postgres.TimestampColumn("updated_at")
		DeletedAtColumn   = postgres.TimestampColumn("deleted_at")
		allColumns        = postgres.ColumnList{IDColumn, KanbanIDColumn, SwimlaneIDColumn, NameColumn, DescriptionColumn, DetailsColumn, CreatedAtColumn, UpdatedAtColumn, DeletedAtColumn}
		mutableColumns    = postgres.ColumnList{KanbanIDColumn, SwimlaneIDColumn, NameColumn, DescriptionColumn, DetailsColumn, CreatedAtColumn, UpdatedAtColumn, DeletedAtColumn}
	)

	return cardTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:          IDColumn,
		KanbanID:    KanbanIDColumn,
		SwimlaneID:  SwimlaneIDColumn,
		Name:        NameColumn,
		Description: DescriptionColumn,
		Details:     DetailsColumn,
		CreatedAt:   CreatedAtColumn,
		UpdatedAt:   UpdatedAtColumn,
		DeletedAt:   DeletedAtColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}
