import { AuthGuard } from '@/features/admin-editor/components/auth-guard';
import { ProjectEditorView } from '@/features/admin-editor/views/project-editor-view';

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  return (
    <AuthGuard>
      <ProjectEditorView projectId={id} />
    </AuthGuard>
  );
}
