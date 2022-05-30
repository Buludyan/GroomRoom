build-dev:
	cd GroomRoom-client && $(MAKE) build-dev
	cd GroomRoom-server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

###

build-local:
	cd GroomRoom-client && $(MAKE) build-local
	cd GroomRoom-server && $(MAKE) build

run-local:
	docker-compose -f docker-compose-local.yml up

###

build-production:
	cd GroomRoom-client && $(MAKE) build-production
	cd GroomRoom-server && $(MAKE) build

run-production:
	docker-compose -f docker-compose-production.yml up
