// Hook preparado para analíticas. El proveedor real se implementará en el futuro.
export type EventName = 
  | 'club_view' 
  | 'club_pin_click' 
  | 'search' 
  | 'filter_applied' 
  | 'city_visit' 
  | 'claim_started';

export const trackEvent = (eventName: EventName, properties?: Record<string, any>) => {
  // TODO: Implementar Mixpanel / PostHog / Google Analytics
  console.log(`[Analytics Stub] ${eventName}`, properties);
};

export const useAnalytics = () => {
  return { trackEvent };
};
