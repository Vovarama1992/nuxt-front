import { jwtDecode } from 'jwt-decode';

export function useSelfProfileId() {
  const token = unref(useCookie('access_token'));
  if (!token)
    return null;

  const decoded = jwtDecode<{ profileId: string }>(token);
  if (!decoded || !decoded.profileId)
    return null;

  return decoded.profileId;
}