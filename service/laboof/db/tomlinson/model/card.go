//
// Code generated by go-jet DO NOT EDIT.
//
// WARNING: Changes to this file may cause incorrect behavior
// and will be lost if the code is regenerated
//

package model

import (
	"github.com/google/uuid"
	"time"
)

type Card struct {
	ID          uuid.UUID `sql:"primary_key"`
	KanbanID    uuid.UUID
	SwimlaneID  uuid.UUID
	Name        string
	Description string
	Details     string
	CreatedAt   time.Time
	UpdatedAt   *time.Time
	DeletedAt   *time.Time
}
