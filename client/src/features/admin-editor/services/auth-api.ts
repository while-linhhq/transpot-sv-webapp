import { apiFetch, setAuthTokens, clearAuthTokens } from '@/lib/http-client';
import { paths } from '@/router/paths';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string | null };
};

export async function login(email: string, password: string) {
  const data = await apiFetch<LoginResponse>(paths.api.auth.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuthTokens(data.accessToken, data.refreshToken);
  return data;
}

export function logout() {
  clearAuthTokens();
}

export async function getMe() {
  return apiFetch<{ id: string; email: string; name: string | null }>(
    paths.api.auth.me
  );
}
