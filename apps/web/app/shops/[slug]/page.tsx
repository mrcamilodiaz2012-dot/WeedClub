import { redirect } from 'next/navigation';

export default async function LegacyShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/grow-shops/${slug}`);
}
