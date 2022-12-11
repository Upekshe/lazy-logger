process.env._LOG_LEVEL = 20;

const assert = require("assert");
const { LOGGER } = require("../lib");
const sinon = require("sinon");

describe("Lazy logger", function () {
  it("should log only messages with higher or equal level than INFO messages", function () {
    const spy = sinon.spy(console, "log");
    LOGGER.error(() => ["This is an error message"]);
    LOGGER.info(() => ["This is an info message"]);
    LOGGER.trace(() => ["This is an trace message"]);
    LOGGER.debug(() => ["This is an debug message"]);
    assert.equal(spy.callCount, 2);
  });
});
