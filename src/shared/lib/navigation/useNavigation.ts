import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
    openNotifications,
    openDetail,
  };
};
