module elonbust

go 1.21.0

require (
	washambi-env v0.0.0
	washambi-rpc v0.0.0
	github.com/go-chi/chi/v5 v5.0.10
)

replace washambi-env v0.0.0 => ../../env/go

replace washambi-rpc v0.0.0 => ../../rpc/package/go
