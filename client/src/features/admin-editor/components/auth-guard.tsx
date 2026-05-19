'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/router/paths';
import { getMe } from '../services/auth-api';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace(paths.admin.login);
      return;
    }
    getMe()
      .then(() => setReady(true))
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.replace(paths.admin.login);
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Đang xác thực...</p>
      </div>
    );
  }

  return <>{children}</>;
}
