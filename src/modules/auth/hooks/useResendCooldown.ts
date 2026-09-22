import { useCallback, useEffect, useState } from "react";

/**
 * Counts down the window in which "Resend code" stays disabled.
 */
export function useResendCooldown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const [restartNonce, setRestartNonce] = useState(0);

  // Depending on `remaining` here would tear down and recreate the interval on
  // every tick, which drifts. `restartNonce` restarts it only on a real resend.
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [restartNonce]);

  const restart = useCallback(() => {
    setRemaining(seconds);
    setRestartNonce((nonce) => nonce + 1);
  }, [seconds]);

  return { remaining, isCoolingDown: remaining > 0, restart };
}
