# lazy-logger

Simple console logger to improve performance with lazy string evaluation.

## How to use

### Control the logging with levels

```

/**
 * the log level is taken from the env variable "_LOG_LEVEL"
 * log level could be any integer between 0 - 50
 *   TRACE = 0,
 *   DEBUG = 10,
 *   INFO  = 20,
 *   WARN  = 30,
 *   ERROR = 40,
 *   SEVERE = 50
 */

// _LOG_LEVEL = 20

import { LOGGER } from "@mter/lazy-logger"

LOGGER.severe(()=>"This is my severe log message") // print "This is my severe log message"
LOGGER.error(()=>"This is my error log message") // print "This is my error log message"
LOGGER.warn(()=>"This is my warning log message") // print "This is my warning log message"
LOGGER.info(()=>"This is my info log message") // print "This is my info log message"
LOGGER.debug(()=>"This is my log message") // print nothing
LOGGER.trace(()=>"This is my log message") // print nothing

```

### Change what's printed depending on the current log level

```

LOGGER.info((loglevel) => {
  if (loglevel < LEVEL.INFO)
    return [
      "This is my special message when log level is info",
      {
        /* some details object */
      },
    ];
    return ["This is my default message"]
});

```

### Set log level programatically

```
import { LOGGER, LEVEL } from "@mtr/lazy-logger"

...

LOGGER.setLogLevel(LEVEL.DEBUG); 

```