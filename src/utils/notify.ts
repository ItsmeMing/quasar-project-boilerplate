import { Notify } from 'quasar';

function error(message: string) {
  Notify.create({
    type: 'negative',
    position: 'top',
    icon: 'fa-solid fa-xmark',
    message: message
  });
}

function success(message: string) {
  Notify.create({
    type: 'positive',
    position: 'top',
    icon: 'fa-solid fa-circle-check',
    message: message
  });
}

export default { success, error };
