# Reporter Types: dot, spec, tap, landing, list, progress, doc, json
REPORTER = spec
UNIT_TESTS = $(shell find test/unit/ -name '*Test.js')
INTEGRATION_TESTS = $(shell find test/integration -name '*Test.js')

test: test-unit

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(UNIT_TESTS)
