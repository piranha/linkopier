linkopier.xpi: $(shell find ext -type f)
	rm $@
	cd ext && zip -r ../$@ .
