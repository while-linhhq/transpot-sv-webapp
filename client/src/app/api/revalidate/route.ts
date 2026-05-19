import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/du-an-hoan-thanh');

  const body = (await request.json().catch(() => ({}))) as { slug?: string };
  if (body.slug) {
    revalidatePath(`/du-an-hoan-thanh/${body.slug}`);
  }

  return NextResponse.json({ success: true, revalidated: true });
}
