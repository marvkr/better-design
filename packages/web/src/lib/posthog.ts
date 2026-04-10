import { PostHog } from "posthog-node";

let _posthog: PostHog | null = null;

export function getPostHog(): PostHog {
  if (!_posthog) {
    _posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
      host: process.env.POSTHOG_HOST,
      enableExceptionAutocapture: true,
    });
  }
  return _posthog;
}
