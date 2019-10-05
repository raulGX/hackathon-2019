package socket

import "github.com/bytexro/hackaton2019-wubbadubdub/backend/users"

type Action struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type ConnectionCode int

const (
	ON ConnectionCode = iota
	Off
)

type Connection struct {
	User     users.User
	Type     ConnectionCode
	ToClient chan<- []byte
}
