import Swal from 'sweetalert2';

interface AlertNotificationProps {
  icon: 'warning' | 'error' | 'success' | 'info' | 'question'
  title?: string
  text: string
  showConfirmButton?: boolean
  timer?: number
  footer?: string
}

const AlertNotification = (dataAlert: AlertNotificationProps) => {
  const {
    icon,
    title = '',
    text,
    showConfirmButton = false,
    footer = '<div></div>',
    timer = 5000
  } = dataAlert;
  Swal.fire({
    icon,
    title,
    text,
    showConfirmButton,
    footer,
    timer,
    timerProgressBar: true
  });
};

export default AlertNotification;
