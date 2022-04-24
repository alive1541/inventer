export declare class LinkedList<T> {
    head: ListNode<T>;
    tail: ListNode<T>;
    size: number;
    constructor();
    push(data: T): void;
    clear(): void;
}
export declare class ListNode<T> {
    next: ListNode<T> | null;
    prev: ListNode<T> | null;
    data: T | null;
    constructor(data: T | null);
}
