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

var Swimlane = newSwimlaneTable("tomlinson", "swimlane", "")

type swimlaneTable struct {
	postgres.Table

	// Columns
	ID        postgres.ColumnString
	KanbanID  postgres.ColumnString
	Name      postgres.ColumnString
	Index     postgres.ColumnInteger
	CreatedAt postgres.ColumnTimestamp
	UpdatedAt postgres.ColumnTimestamp
	DeletedAt postgres.ColumnTimestamp

	AllColumns     postgres.ColumnList
	MutableColumns postgres.ColumnList
}

type SwimlaneTable struct {
	swimlaneTable

	EXCLUDED swimlaneTable
}

// AS creates new SwimlaneTable with assigned alias
func (a SwimlaneTable) AS(alias string) *SwimlaneTable {
	return newSwimlaneTable(a.SchemaName(), a.TableName(), alias)
}

// Schema creates new SwimlaneTable with assigned schema name
func (a SwimlaneTable) FromSchema(schemaName string) *SwimlaneTable {
	return newSwimlaneTable(schemaName, a.TableName(), a.Alias())
}

// WithPrefix creates new SwimlaneTable with assigned table prefix
func (a SwimlaneTable) WithPrefix(prefix string) *SwimlaneTable {
	return newSwimlaneTable(a.SchemaName(), prefix+a.TableName(), a.TableName())
}

// WithSuffix creates new SwimlaneTable with assigned table suffix
func (a SwimlaneTable) WithSuffix(suffix string) *SwimlaneTable {
	return newSwimlaneTable(a.SchemaName(), a.TableName()+suffix, a.TableName())
}

func newSwimlaneTable(schemaName, tableName, alias string) *SwimlaneTable {
	return &SwimlaneTable{
		swimlaneTable: newSwimlaneTableImpl(schemaName, tableName, alias),
		EXCLUDED:      newSwimlaneTableImpl("", "excluded", ""),
	}
}

func newSwimlaneTableImpl(schemaName, tableName, alias string) swimlaneTable {
	var (
		IDColumn        = postgres.StringColumn("id")
		KanbanIDColumn  = postgres.StringColumn("kanban_id")
		NameColumn      = postgres.StringColumn("name")
		IndexColumn     = postgres.IntegerColumn("index")
		CreatedAtColumn = postgres.TimestampColumn("created_at")
		UpdatedAtColumn = postgres.TimestampColumn("updated_at")
		DeletedAtColumn = postgres.TimestampColumn("deleted_at")
		allColumns      = postgres.ColumnList{IDColumn, KanbanIDColumn, NameColumn, IndexColumn, CreatedAtColumn, UpdatedAtColumn, DeletedAtColumn}
		mutableColumns  = postgres.ColumnList{KanbanIDColumn, NameColumn, IndexColumn, CreatedAtColumn, UpdatedAtColumn, DeletedAtColumn}
	)

	return swimlaneTable{
		Table: postgres.NewTable(schemaName, tableName, alias, allColumns...),

		//Columns
		ID:        IDColumn,
		KanbanID:  KanbanIDColumn,
		Name:      NameColumn,
		Index:     IndexColumn,
		CreatedAt: CreatedAtColumn,
		UpdatedAt: UpdatedAtColumn,
		DeletedAt: DeletedAtColumn,

		AllColumns:     allColumns,
		MutableColumns: mutableColumns,
	}
}