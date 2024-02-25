import { NotificationParam } from '@/types/commonNotificaton';
import { notification } from 'antd';

const useToast = () => {
  const [api, contextHolder] = notification.useNotification();

  const setNotif = ({ type = 'success', title, description }: NotificationParam) => {
    api[type]({
      message: title,
      description,
      placement: 'top',
      duration: 3,
    });
  };

  return { setNotif, contextHolder };
};

export default useToast;
