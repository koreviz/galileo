##
# Kore Make
# Copyright(c) 2012 Koreviz
# MIT Licensed
##
SHELL := /bin/bash

APP = galileo
REPO = koreviz/$(APP)

all: configure
	
clean:
	rm -fR node_modules 
	
configure:
	npm install

push:
	rm -fR .git public/.git
	git init
	git add .
	git commit -m "Initial release"
	git remote add origin gh:$(REPO).git
	git push origin master
	
update:
	npm update