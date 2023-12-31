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

type User struct {
	ID              uuid.UUID `sql:"primary_key"`
	Username        string
	Password        string
	RecoveryPrompt1 string
	RecoveryPrompt2 string
	RecoveryPrompt3 string
	RecoveryAnswer1 string
	RecoveryAnswer2 string
	RecoveryAnswer3 string
	CreatedAt       time.Time
	UpdatedAt       *time.Time
	DeletedAt       *time.Time
}
