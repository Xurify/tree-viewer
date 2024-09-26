import { NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { createTreeFromZip } from '@/utils/zip-utils';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();
    const tree = await createTreeFromZip(entries);

    return NextResponse.json(tree);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    return NextResponse.json({ error: 'Error processing ZIP file' }, { status: 500 });
  }
}