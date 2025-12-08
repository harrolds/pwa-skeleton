export interface ScreenAction {
  id: string;
  /**
   * i18n key for the accessible label of the action.
   */
  labelKey: string;
  /**
   * Optional semantic icon identifier, used by the shell to render a symbol.
   */
  icon?: string;
  /**
   * Optional navigation target; if provided the shell will use the navigation
   * API to route to this target.
   */
  navigationTarget?: string;
}

/**
 * Configuration for a logical screen within the application shell.
 */
export interface ScreenConfig {
  /**
   * Stable identifier for the screen, used for lookups and analytics.
   */
  id: string;
  /**
   * Route path that activates this screen.
   */
  route: string;
  /**
   * i18n key for the screen title.
   */
  titleKey: string;
  /**
   * Optional list of secondary actions rendered in the header.
   */
  actions?: ScreenAction[];
}
