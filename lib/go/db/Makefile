.DEFAULT_GOAL = all

all: zoomers tomlinson nuland

zoomers:
	jet \
		-dsn="postgresql://washambi_local:washambi@localhost:5432/washambi_local?sslmode=disable" \
		-schema=zoomers \
		-path=./ \
	&& \
	rm -rf ./zoomers \
	&& \
	mv ./washambi_local/zoomers ./ \
	&& \
	rm -rf ./washambi_local

tomlinson:
	jet \
		-dsn="postgresql://washambi_local:washambi@localhost:5432/washambi_local?sslmode=disable" \
		-schema=tomlinson \
		-path=./ \
	&& \
	rm -rf ./tomlinson \
	&& \
	mv ./washambi_local/tomlinson ./ \
	&& \
	rm -rf ./washambi_local

nuland:
	jet \
		-dsn="postgresql://washambi_local:washambi@localhost:5432/washambi_local?sslmode=disable" \
		-schema=nuland \
		-path=./ \
	&& \
	rm -rf ./nuland \
	&& \
	mv ./washambi_local/nuland ./ \
	&& \
	rm -rf ./washambi_local

