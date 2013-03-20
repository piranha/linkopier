CFX = cfx
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

all: linkopier.xpi linkopier.crx

linkopier.xpi: $(shell find ff -type f)
	$(CFX) xpi --pkgdir=ff

linkopier.crx: $(shell find chrome -type f)
	$(CHROME) --pack-extension=chrome --pack-extension-key=$(CHROME_EXT_KEY)
	mv chrome.crx $@
