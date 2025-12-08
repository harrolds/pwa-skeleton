import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getModuleById } from '../modules';

type NavigationTarget = 'home' | 'notifications' | 'settings' | string;

const resolveTarget = (target: NavigationTarget): string => {
  switch (target) {
    case 'home':
      return '/';
    case 'notifications':
      return '/notifications';
    case 'settings':
      return '/settings';
    default:
      return target.startsWith('/') ? target : `/${target}`;
  }
};

export interface NavigationApi {
  goTo: (target: NavigationTarget) => void;
  goBack: () => void;
  openSettings: () => void;
  openModuleSettings: (moduleId: string) => void;
  openNotifications: () => void;
  openDetail: (entity: string, id: string | number) => void;
}

export const useNavigation = (): NavigationApi => {
  const navigate = useNavigate();

  const goTo = useCallback(
    (target: NavigationTarget) => {
      navigate(resolveTarget(target));
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  const openModuleSettings = useCallback(
    (moduleId: string) => {
      const moduleDefinition = getModuleById(moduleId);
      if (moduleDefinition?.settingsRoute) {
        navigate(moduleDefinition.settingsRoute);
        return;
      }

      const encodedModuleId = encodeURIComponent(moduleId);
      navigate(`/settings/${encodedModuleId}`);
    },
    [navigate]
  );

  const openNotifications = useCallback(() => {
    navigate('/notifications');
  }, [navigate]);

  const openDetail = useCallback(
    (entity: string, id: string | number) => {
      const encodedEntity = encodeURIComponent(entity);
      const encodedId = encodeURIComponent(String(id));
      navigate(`/detail/${encodedEntity}/${encodedId}`);
    },
    [navigate]
  );

  return {
    goTo,
    goBack,
    openSettings,
    openModuleSettings,
    openNotifications,
    openDetail,
  };
};
