export type Consumer<T> = (input: T) => void;
export type BiConsumer<T,U> = (input1: T,input2:U) => void;
export type Runnable = () => void;