import { AuthGuard } from '@/features/admin-editor/components/auth-guard';
import { ProjectsAdminView } from '@/features/admin-editor/views/projects-admin-view';

export default function AdminProjectsPage() {
  return (
    <AuthGuard>
      <ProjectsAdminView />
    </AuthGuard>
  );
}
