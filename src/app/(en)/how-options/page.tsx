// Temporary page: How it works animation variants side by side. Delete once chosen.

const motions = [
  { code: "a", label: "а) уходит — сжимается и темнеет, приходит — снизу" },
  { code: "b", label: "б) чистый кросс-фейд" },
  { code: "c", label: "в) горизонтальный сдвиг к позиции следующего шага" },
];

const numbers = [
  { code: "small", label: "Номер: маленький акцентный «01» (как сейчас)" },
  { code: "outline", label: "Номер: большой контурный 180px (как в референсе)" },
];

function Frame({ src, title }: { src: string; title: string }) {
  return (
    <div className="h-[450px] overflow-hidden rounded-card border border-border">
      <iframe
        title={title}
        src={src}
        className="origin-top-left"
        style={{ width: 1440, height: 900, transform: "scale(0.5)" }}
      />
    </div>
  );
}

export default function HowOptions() {
  return (
    <main className="flex flex-col gap-10 p-6">
      <section className="grid grid-cols-2 gap-6">
        {numbers.map((n) => (
          <figure key={n.code} className="flex flex-col gap-2">
            <figcaption className="text-sm font-semibold">{n.label}</figcaption>
            <Frame src={`/how-options/demo?num=${n.code}`} title={n.label} />
          </figure>
        ))}
      </section>
      <section className="grid grid-cols-2 gap-6">
        {motions.map((m) => (
          <figure key={m.code} className="flex flex-col gap-2">
            <figcaption className="text-sm font-semibold">{m.label}</figcaption>
            <Frame src={`/how-options/demo?motion=${m.code}`} title={m.label} />
          </figure>
        ))}
      </section>
    </main>
  );
}
