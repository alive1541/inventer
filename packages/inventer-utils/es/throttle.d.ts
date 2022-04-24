declare type FN = (...args: Array<any>) => void;
export declare function throttle(fn: FN, interval?: number, defValue?: any): (...args: Array<any>) => any;
export {};
