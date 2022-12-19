process.env._LOG_LEVEL = 20;

const assert = require("assert");
const { LOGGER, LEVEL } = require("../lib");
const sinon = require("sinon");

describe("Lazy logger", function () {
  let spy;

  before(() => {
    spy = sinon.spy(console, "log");
  });

  afterEach(() => {
    spy.resetHistory();
  });

  it("should log only messages with higher or equal level than INFO messages", function () {
    LOGGER.error(() => ["This is an error message"]);
    LOGGER.info(() => ["This is an info message"]);
    LOGGER.trace(() => ["This is an trace message"]);
    LOGGER.debug(() => ["This is an debug message"]);
    assert.equal(spy.callCount, 2);
  });

  it("should log all messages with higher or equal level than TRACE messages, after set new level", function () {
    LOGGER.setLogLevel(LEVEL.TRACE);
    LOGGER.error(() => ["This is an error message"]);
    LOGGER.info(() => ["This is an info message"]);
    LOGGER.trace(() => ["This is an trace message"]);
    LOGGER.debug(() => ["This is an debug message"]);
    assert.equal(spy.callCount, 4);
  });

  it("should log all messages with higher or equal level than WARN messages, after set new level", function () {
    LOGGER.setLogLevel(LEVEL.WARN);
    LOGGER.severe(() => ["This is an severe message"]);
    LOGGER.error(() => ["This is an error message"]);
    LOGGER.warn(() => ["This is an warn message"]);
    LOGGER.info(() => ["This is an info message"]);
    LOGGER.trace(() => ["This is an trace message"]);
    LOGGER.debug(() => ["This is an debug message"]);
    assert.equal(spy.callCount, 3);
  });

  it("shouid throw error if set a log level less than zero", () => {
    assert.throws(() => {
      LOGGER.setLogLevel(-1);
    }, "Should throw error `Invalid log level`");
  });

  it("shouid throw error if set a log level greater than SEVERE", () => {
    assert.throws(() => {
      LOGGER.setLogLevel(LEVEL.SEVERE + 1);
    }, "Should throw error `Invalid log level`");
  });
});
