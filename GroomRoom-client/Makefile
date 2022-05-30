build-dev:
	docker build -t react-app .

build-local:
	docker build \
		-t react-app-production:local \
		--build-arg BASE_URL=http://localhost:6060/ \
		-f Dockerfile.production .

build-production:
	docker build \
		-t react-app-production:production \
		--build-arg BASE_URL=http://68.183.7.78:6060// \
		-f Dockerfile.production .
	