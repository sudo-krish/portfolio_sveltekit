import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

const dsn = env.PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
  });
}

export const handleError = dsn 
  ? Sentry.handleErrorWithSentry()
  : async ({ error }: { error: unknown }) => { console.error(error); };
