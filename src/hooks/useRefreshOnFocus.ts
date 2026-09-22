import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";

/**
 * Refetches active stale queries when a screen regains focus.
 *
 * `refetchOnWindowFocus` only covers the whole app becoming active; moving
 * between screens inside the app is a separate signal.
 *
 * @param queryKey Limits the refetch to one key namespace. Omit to refresh
 *   every active stale query.
 */
export function useRefreshOnFocus(queryKey?: QueryKey): void {
  const queryClient = useQueryClient();
  const isFirstFocus = useRef(true);

  const keyRef = useRef(queryKey);
  useEffect(() => {
    keyRef.current = queryKey;
  });

  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }

      queryClient.refetchQueries({
        queryKey: keyRef.current,
        stale: true,
        type: "active",
      });
    }, [queryClient]),
  );
}
