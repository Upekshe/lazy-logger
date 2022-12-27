process.env._LOG_LEVEL = 20;

const assert = require("assert");
const { after } = require("mocha");
const { LOGGER, LEVEL } = require("../lib");

describe("Lazy logger", function () {
  const sinon = require("sinon");
  let spy;

  before(() => {
    console.info("========== Test Start ==========");
    spy = sinon.spy(console, "log");
  });

  after(() => {
    spy.restore();
    console.info("========== All Tests Complete ==========");
  });

  afterEach(() => {
    LOGGER.setLogLevel(LEVEL.TRACE);
    spy.resetHistory();
    console.info("========== Test Complete ==========");
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

  it("should throw error if set a log level less than zero", () => {
    assert.throws(() => {
      LOGGER.setLogLevel(-1);
    }, "Should throw error `Invalid log level`");
  });

  it("should throw error if set a log level greater than SEVERE", () => {
    assert.throws(() => {
      LOGGER.setLogLevel(LEVEL.SEVERE + 1);
    }, "Should throw error `Invalid log level`");
  });

  it("should return TRUE when try INFO when current log level is DEBUG", () => {
    LOGGER.setLogLevel(LEVEL.DEBUG);
    assert.equal(LOGGER.isLogLevelLoggable(LEVEL.INFO), true);
  });

  it("should return FALSE when try INFO when current log level is WARN", () => {
    LOGGER.setLogLevel(LEVEL.WARN);
    assert.equal(LOGGER.isLogLevelLoggable(LEVEL.INFO), false);
  });

  it("should amend the log level to the message as a prefix, if setting is enabled", () => {
    LOGGER.setLogLevel(LEVEL.INFO);
    LOGGER.enablePreAmendingLogLevel(true);
    LOGGER.info(() => ["message should be pre amended with INFO"]);
    assert(spy.calledOnce);
    assert(
      spy.calledOnceWithExactly(
        "[INFO]",
        "message should be pre amended with INFO"
      )
    );
  });

  it("should not amend the log level to the message as a prefix, if setting is not enabled", () => {
    LOGGER.setLogLevel(LEVEL.INFO);
    LOGGER.enablePreAmendingLogLevel(false);
    LOGGER.info(() => ["message should NOT be pre amended with INFO"]);
    assert(spy.calledOnce);
    assert(
      spy.neverCalledWithMatch(
        "[INFO]",
        "message should NOT be pre amended with INFO"
      )
    );
    assert(
      spy.calledOnceWithExactly("message should NOT be pre amended with INFO")
    );
  });
});
