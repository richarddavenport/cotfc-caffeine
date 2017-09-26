import { firebaseDev } from '../../firebase.config';

export const environment = {
  production: false,
  hmr: true,
  firebase: firebaseDev,
  signInSuccessUrl: 'http://localhost:5000'
};
