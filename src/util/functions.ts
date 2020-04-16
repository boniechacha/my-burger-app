export type Consumer<T> = (input: T) => void;
export type BiConsumer<T, U> = (input1: T, input2: U) => void;
export type Runnable = () => void;
export type Supplier<T> = () => T;
export type Function<T, U> = (input: T) => U;

export function convertMapToQuery(map:Map<string,any>) {
    return Array.from(map.keys())
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(map.get(key)!)}`)
        .join('&')
}

export function convertQueryToMap(query:string) {
    const map = new Map<string,string>();
    new URLSearchParams(query).forEach((value, key) => {
        map.set(key, value)
    })

    return map;
}