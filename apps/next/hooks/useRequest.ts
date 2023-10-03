import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

export const useRequest = <T>(
  url: string,
  method = 'GET',
  body: any = null,
  dependencies: any[] = [],
  shouldFetch = true,
  formatDataFunction: ((data: any) => T) | null = null,
  defaultValue: T | null = null
): [T | null, boolean, any, () => void] => {
  const [data, setData] = useState<T | null>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [manualTrigger, setManualTrigger] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const run = useCallback(() => {
    setManualTrigger((prevState) => prevState + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchRequest = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const options: RequestInit = {
          method,
          signal,
          headers: { 'Content-Type': 'application/json' },
          cache: 'force-cache',
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const responseData = await response.json();
        setData(
          formatDataFunction ? formatDataFunction(responseData) : responseData
        );
      } catch (e) {
        if (e.name !== 'AbortError') {
          // Don't set error state if fetch was aborted
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldFetch) {
      fetchRequest();
    }

    return () => {
      abortController.abort();
    };
  }, [url, shouldFetch, manualTrigger, method, body, formatDataFunction]);

  return [data, isLoading, error, run];
};
