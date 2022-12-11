/*!
 * lazy-logger v0.0.1
 * 
 * Copyright (c) 2022 upekshe jay <upekshejay@gmail.com>
 * https://github.com/Upekshe/lazy-logger
 *
 * Licensed under the MIT license.
 */

import { LazyLoggerInterface, LEVEL } from "./lazy-logger-interface";
const LOG_LEVEL = process.env._LOG_LEVEL == null ? LEVEL.TRACE : process.env._LOG_LEVEL

class LazyLogger implements LazyLoggerInterface {

    public trace(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.TRACE, provider);
    }

    public debug(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.DEBUG, provider);
    }

    public info(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.INFO, provider);
    }

    public warn(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.WARN, provider);
    }

    public error(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.ERROR, provider);
    }

    public severe(provider: (level?: LEVEL) => any[]): void {
        this.log(LEVEL.SEVERE, provider);
    }

    private log(level: number, provider: (level?: LEVEL) => any[] = (level) => []): void {
        if (level < LOG_LEVEL) { return; }
        // avoid evaluation the provider if log level is less than system log level
        console.log(...provider(level));
    }

}

export const LOGGER: LazyLoggerInterface = new LazyLogger();
