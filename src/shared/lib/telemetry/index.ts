import { debug } from '../logging';

export type TelemetryPayload = Record<string, unknown>;

export const trackEvent = (name: string, payload?: TelemetryPayload): void => {
  debug('[telemetry:event]', name, payload ?? {});
};

export const trackScreenView = (screenId: string): void => {
  trackEvent('screen_view', { screenId });
};

