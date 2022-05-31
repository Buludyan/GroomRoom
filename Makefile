build-production:
	cd GroomRoom-client && $(MAKE) build-production
	cd GroomRoom-server && $(MAKE) build

run-production:
	docker-compose -f docker-compose-production.yml up
