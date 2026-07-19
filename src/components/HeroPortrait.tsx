export default function HeroPortrait() {
  return (
    <div className="relative w-full rounded-[32px] overflow-hidden animate-[float_6s_ease-in-out_infinite]">
      <img
        src="/hero-portrait.jpg"
        alt="Alireza Rogni"
        className="w-full h-auto object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,12,0) 65%, rgba(12,12,12,0.85) 100%), linear-gradient(0deg, rgba(139,92,246,0.12), rgba(255,138,61,0.08))',
        }}
      />
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.55)' }}
      />
    </div>
  );
}
