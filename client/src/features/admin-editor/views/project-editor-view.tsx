'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RichTextEditor,
  type RichTextEditorHandle,
} from '../components/rich-text-editor';
import {
  createProject,
  updateProject,
  fetchProjectById,
} from '@/features/projects/services/projects-api';
import type { Project } from '@/features/projects/services/projects-api';

type ProjectEditorViewProps = {
  projectId?: string;
};

export function ProjectEditorView({ projectId }: ProjectEditorViewProps) {
  const router = useRouter();
  const isEdit = !!projectId;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentHtml, setContentHtml] = useState('<p></p>');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef<RichTextEditorHandle>(null);

  useEffect(() => {
    if (!projectId) return;
    fetchProjectById(projectId)
      .then((project: Project) => {
        setTitle(project.title);
        setSlug(project.slug);
        setExcerpt(project.excerpt ?? '');
        setContentHtml(project.contentHtml);
        setTags(project.tags.join(', '));
        setStatus(project.status);
      })
      .catch(() => router.push(paths.admin.projects))
      .finally(() => setLoading(false));
  }, [projectId, router]);

  const handleSave = async (publishStatus?: 'DRAFT' | 'PUBLISHED') => {
    setSaving(true);
    const html = editorRef.current?.getHtml() ?? contentHtml;
    const payload = {
      title,
      slug: slug || undefined,
      excerpt,
      contentHtml: html.length > 8 ? html : '<p>Nội dung dự án</p>',
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: publishStatus ?? status,
    };

    try {
      let savedSlug = slug;
      if (isEdit && projectId) {
        const saved = await updateProject(projectId, payload);
        savedSlug = saved.slug;
      } else {
        const saved = await createProject(payload);
        savedSlug = saved.slug;
      }

      if ((publishStatus ?? status) === 'PUBLISHED') {
        const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
        if (secret) {
          await fetch(
            `/api/revalidate?secret=${encodeURIComponent(secret)}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug: savedSlug }),
            }
          ).catch(() => undefined);
        }
      }

      router.push(paths.admin.projects);
    } catch {
      alert('Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-border bg-surface sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href={paths.admin.projects}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
          <div className="flex gap-2">
            {slug && status === 'PUBLISHED' && (
              <a
                href={paths.projectDetail(slug)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Xem
                </Button>
              </a>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={saving}
              onClick={() => handleSave('DRAFT')}
            >
              Lưu nháp
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={saving}
              className="gap-1"
              onClick={() => handleSave('PUBLISHED')}
            >
              <Save className="h-4 w-4" />
              {saving ? 'Đang lưu...' : 'Xuất bản'}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="tu-dong-tao-tu-tieu-de"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Mô tả ngắn</Label>
          <Input
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="chuyen-nha, da-nang"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Nội dung bài viết</Label>
          <div className="mt-2">
            <RichTextEditor
              ref={editorRef}
              content={contentHtml}
              onChange={setContentHtml}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
