'use client';

import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchAllProjects, deleteProject } from '@/features/projects/services/projects-api';
import { logout } from '../services/auth-api';
import { useRouter } from 'next/navigation';

export function ProjectsAdminView() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: () => fetchAllProjects(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] }),
  });

  const handleLogout = () => {
    logout();
    router.push(paths.admin.login);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Quản lý dự án</h1>
          <div className="flex gap-2">
            <Link href={paths.admin.projectNew}>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm dự án
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {isLoading && <p>Đang tải...</p>}
        {data && (
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tiêu đề</th>
                  <th className="px-4 py-3 font-semibold">Trạng thái</th>
                  <th className="px-4 py-3 font-semibold">Ngày đăng</th>
                  <th className="px-4 py-3 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((project) => (
                  <tr key={project.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{project.title}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          project.status === 'PUBLISHED' ? 'success' : 'warning'
                        }
                      >
                        {project.status === 'PUBLISHED' ? 'Đã đăng' : 'Nháp'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {project.publishedAt
                        ? new Date(project.publishedAt).toLocaleDateString('vi-VN')
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={paths.admin.projectEdit(project.id)}>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Pencil className="h-3 w-3" />
                            Sửa
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => {
                            if (confirm('Xóa dự án này?')) {
                              deleteMutation.mutate(project.id);
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
