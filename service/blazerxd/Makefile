export DB=./db

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
