import {useEffect, useState} from "react";

export type DebounceValue = string | number | object | null;

export interface UseDebounce {
    (
        value: DebounceValue,
        delay: number
    ): DebounceValue
}

const useDebounce: UseDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState<DebounceValue>(value);

    useEffect(() => {
            // Set debouncedValue to value (passed in) after the specified delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Return a cleanup function that will be called every time
            // useEffect is re-called.
            // This is how we prevent debouncedValue from changing if value is
            // changed within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
