module elonbust

go 1.21.0

require (
	bcoli v0.0.0
	github.com/go-chi/chi/v5 v5.0.10
	washambi-env v0.0.0
)

replace washambi-env v0.0.0 => ../../env/go

replace washambi-rpc v0.0.0 => ../../rpc/package/go

replace bcoli v0.0.0 => ../bcoli
