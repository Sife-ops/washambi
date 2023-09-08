module fancypenosi

go 1.21.0

require (
	github.com/go-chi/chi/v5 v5.0.10
	golang.org/x/crypto v0.12.0
	google.golang.org/grpc v1.57.0
	washambi-env v0.0.0
	washambi-rpc v0.0.0
	bcoli v0.0.0
)

require (
	github.com/golang/protobuf v1.5.3 // indirect
	golang.org/x/net v0.10.0 // indirect
	golang.org/x/sys v0.11.0 // indirect
	golang.org/x/text v0.12.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20230525234030-28d5490b6b19 // indirect
	google.golang.org/protobuf v1.31.0 // indirect
)

replace washambi-env v0.0.0 => ../../env/go

replace bcoli v0.0.0 => ../bcoli
replace washambi-rpc v0.0.0 => ../../rpc/package/go
