// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local
package main

import (
    "fmt"
	"washambi-rpc/shishamo/v1"
)

func main() {
    u := shishamo.User{
        Email: "lol",
    }
    fmt.Println(u)
}