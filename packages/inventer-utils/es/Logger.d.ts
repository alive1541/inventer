export declare class Logger {
    topic: string;
    constructor(topic: string);
    debug(...args: Array<any>): void;
    log(...args: Array<any>): void;
}
