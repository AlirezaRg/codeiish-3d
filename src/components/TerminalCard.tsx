export default function TerminalCard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{
        background: 'linear-gradient(160deg, #17181c 0%, #0c0c0c 100%)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-white/40 font-mono">alireza@debian: ~/codeiish</span>
      </div>
      <div className="p-5 font-mono text-[13px] sm:text-sm leading-relaxed text-left">
        <p className="text-white/40">$ systemctl status codeiish</p>
        <p className="text-[#6ee7a7]">● codeiish.service — active (running)</p>
        <p className="text-white/50">&nbsp;&nbsp;since always; deployed via Python + Debian</p>
        <p className="mt-3 text-white/40">$ whoami</p>
        <p className="text-[#c9b8ff]">alireza_rogni — backend &amp; systems engineer</p>
        <p className="mt-3 text-white/40">$ tail -f build.log</p>
        <p className="text-[#ffb060]">bridging ERP, hardware, and AI tooling…</p>
        <span className="inline-block w-2 h-4 bg-white/70 align-middle animate-pulse ml-1" />
      </div>
    </div>
  );
}
