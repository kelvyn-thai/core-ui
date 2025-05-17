/// <reference types="react" />
export type Handler = (event: MouseEvent | TouchEvent) => void;
export declare function useClickOutside<T extends HTMLElement>(handler: Handler, enabled?: boolean): import("react").RefObject<T | null>;
