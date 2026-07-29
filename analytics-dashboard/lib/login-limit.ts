type Attempt = {
  failures: number;
  resetAt: number;
};

const windowMs = 15 * 60 * 1000;
const maximumFailures = 5;
const attempts = new Map<string, Attempt>();

export function mayAttemptLogin(key: string) {
  const now = Date.now();
  const attempt = attempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    attempts.delete(key);
    return true;
  }
  return attempt.failures < maximumFailures;
}

export function recordLoginFailure(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { failures: 1, resetAt: now + windowMs });
    return;
  }
  current.failures += 1;
}

export function clearLoginFailures(key: string) {
  attempts.delete(key);
}
