/*!
 * lazy-logger v0.0.1
 * 
 * Copyright (c) 2022 upekshe jay <upekshejay@gmail.com>
 * https://github.com/Upekshe/lazy-logger
 *
 * Licensed under the MIT license.
 */

import { LazyLoggerInterface, LEVEL } from "./lazy-logger-interface";

const DEFAULT_LOG_LEVEL = process.env._LOG_LEVEL == null ? LEVEL.TRACE : process.env._LOG_LEVEL;
let LOG_LEVEL = DEFAULT_LOG_LEVEL;
let PRE_AMEND_LOG_LEVEL: boolean = true;
class LazyLogger implements LazyLoggerInterface {
    private logLevelNameMapping: Record<LEVEL, string> = {
        [LEVEL.TRACE]: "TRACE",
        [LEVEL.DEBUG]: "DEBUG",
        [LEVEL.INFO]: "INFO",
        [LEVEL.WARN]: "WARN",
        [LEVEL.ERROR]: "ERROR",
        [LEVEL.SEVERE]: "SEVERE"
    }

    public setLogLevel(level: LEVEL): void {
        if (level < 0 || level > LEVEL.SEVERE) {
            throw new Error("Invalid log level");
        }
        LOG_LEVEL = level;
    }

    public isLogLevelLoggable(level: LEVEL): boolean {
        return level >= LOG_LEVEL;
    }

    public enablePreAmendLogLevel(enable: boolean): void {
        PRE_AMEND_LOG_LEVEL = enable === true;
    }

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

    private log(level: LEVEL, provider: (level?: LEVEL) => any[] = (level) => []): void {
        if (this.isLogLevelLoggable(level) !== true) { return; }
        console.log(...this.getPreAmendedItems(level), ...provider(level));
    }

    private getPreAmendedItems(level: LEVEL): string[] {
        const list: string[] = [];
        if (PRE_AMEND_LOG_LEVEL === true) { list.push(`[${this.logLevelNameMapping[level] ?? 'CUSTOM'}]`) }
        return list
    }



}

export const LOGGER: LazyLoggerInterface = new LazyLogger();
