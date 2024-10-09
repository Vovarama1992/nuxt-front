export declare function convertDTOToSearchQuery<T = Record<string, any>>(dto: T): string;
type TransformOptions = {
    value: string;
};
export declare function transformToArray({ value }: TransformOptions): string[];
export declare function transformToBoolean({ value }: TransformOptions): boolean;
export declare function transformToNumber({ value }: TransformOptions): number;
export {};
