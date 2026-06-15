export default function ClubDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Detalle del Club: {params.slug}</h1>
      <p className="text-gray-400">Esta página mostrará la información detallada, reseñas, e imágenes desde Supabase.</p>
    </div>
  );
}
