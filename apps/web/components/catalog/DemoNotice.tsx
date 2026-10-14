import { Info } from 'lucide-react';

export function DemoNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? 'p-3' : 'p-4'} rounded-[20px] bg-amber-50 border border-amber-200/70 flex items-start gap-3`}>
      <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <p className="text-[13px] leading-relaxed text-amber-950">
        <strong>Contenido de demostración.</strong> Estos datos sirven para probar la navegación y no identifican un establecimiento, evento o catálogo verificado.
      </p>
    </div>
  );
}
