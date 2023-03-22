import Api from './api/api';
import { variables } from './api/variables';
import { PATHS } from './PATHS';

export const getAccessRedirect = () => {
  // generate random string
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const redirectUrl = PATHS.WITHINGS.AUTH_CODE.replace('{{client_id}}', variables.client_id).replace('{{state}}', state).replace('{{oauth2_redirect_uri}}', variables.oauth2_redirect_uri).replace('{{scope}}', variables.scope);

  return redirectUrl;
}

export const checkRedirect = () => {
  const currentUrl = window.location.href;
  if (!currentUrl.includes('?code')) return

  const codeIndex = currentUrl.indexOf("=") + 1; // Find the index of the "=" symbol and add 1 to start from the next character
  const ampersandIndex = currentUrl.indexOf("&"); // Find the index of the "&" symbol
  const code = currentUrl.substring(codeIndex, ampersandIndex);

  Api.getAccessToken(code);
}