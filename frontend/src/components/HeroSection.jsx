const stats = [
  { value: "10k+", label: "Active users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-3xl -translate-x-1/2 rounded-full bg-indigo-100 opacity-70 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Left: text */}
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            New: faster, simpler, smarter
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Build better products,{" "}
            <span className="text-indigo-600">faster than ever</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 sm:text-lg lg:mx-0">
            Everything your team needs to plan, launch, and grow in one place.
            Start for free and scale when you're ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Get started free
            </a>
            <a
              href="/features"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Learn more
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 sm:mx-auto sm:max-w-md lg:mx-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-slate-500 sm:text-sm">{stat.label}</dt>
                <dd className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: mock dashboard visual (no external images needed) */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {["bg-indigo-100", "bg-sky-100", "bg-emerald-100"].map((color) => (
                <div key={color} className={`h-16 rounded-lg sm:h-20 ${color}`} />
              ))}
            </div>

            <div className="mt-4 flex h-32 items-end gap-2 rounded-lg bg-slate-50 p-4 sm:h-40">
              {[40, 65, 50, 80, 60, 90, 75].map((height, i) => (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-t bg-indigo-500"
                />
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;