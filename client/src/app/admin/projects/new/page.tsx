import { AuthGuard } from '@/features/admin-editor/components/auth-guard';
import { ProjectEditorView } from '@/features/admin-editor/views/project-editor-view';

export default function NewProjectPage() {
  return (
    <AuthGuard>
      <ProjectEditorView />
    </AuthGuard>
  );
}
