/*!
 * lazy-logger v0.0.1
 * 
 * Copyright (c) 2022 upekshe jay <upekshejay@gmail.com>
 * https://github.com/Upekshe/lazy-logger
 *
 * Licensed under the MIT license.
 */

export enum LEVEL {
    TRACE = 0,
    DEBUG = 10,
    INFO = 20,
    WARN = 30,
    ERROR = 40,
    SEVERE = 50
}

export interface LazyLoggerInterface {

    trace(provider: (level?: LEVEL) => any[]): void;

    debug(provider: (level?: LEVEL) => any[]): void;

    info(provider: (level?: LEVEL) => any[]): void;

    warn(provider: (level?: LEVEL) => any[]): void;

    error(provider: (level?: LEVEL) => any[]): void;

    severe(provider: (level?: LEVEL) => any[]): void;
}
