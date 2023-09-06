.DEFAULT_GOAL = build
export DB = ./db

build:
	go build -o ./bin/serve ./cmd/serve/main.go

sql:
	jet \
		-dsn="postgresql://washambi_local:washambi@localhost:5432/washambi_local?sslmode=disable" \
		-schema=zoomers \
		-path=${DB} \
	&& \
	rm -rf ${DB}/zoomers \
	&& \
	mv ${DB}/washambi_local/zoomers ${DB} \
	&& \
	rm -rf ${DB}/washambi_local

watch:
	air

test-once:
	go test -v ./...

test-watch:
	while inotifywait -r "./" --include ".*\.go" -e moved_from,close_write; do
		echo "rerun in 3"
		sleep 1
		echo "rerun in 2"
		sleep 1
		echo "rerun in 1"
		sleep 1
		go test -v ./...
	done

