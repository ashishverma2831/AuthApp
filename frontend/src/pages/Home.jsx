import HeroSection from "../components/HeroSection";

const features = [
  {
    title: "Fast setup",
    text: "Create an account and start working in minutes, with no complicated configuration.",
  },
  {
    title: "Secure by default",
    text: "Your data stays protected with encryption and sensible permissions out of the box.",
  },
  {
    title: "Team collaboration",
    text: "Share work, leave comments, and keep everyone on the same page in real time.",
  },
  {
    title: "Insightful analytics",
    text: "Track progress with clear dashboards that show what's working and what isn't.",
  },
  {
    title: "Works everywhere",
    text: "A responsive experience that looks great on phones, tablets, and desktops.",
  },
  {
    title: "Friendly support",
    text: "Real people ready to help whenever you get stuck, any day of the week.",
  },
];

const steps = [
  { title: "Sign up", text: "Create your free account with just an email and password." },
  { title: "Set up", text: "Add your team and choose the tools that fit your workflow." },
  { title: "Grow", text: "Launch, measure results, and keep improving over time." },
];

const testimonials = [
  {
    quote: "We went from idea to launch in half the time. The whole team loves it.",
    name: "Aarav Sharma",
    role: "Product Manager",
  },
  {
    quote: "Clean, fast, and reliable. It replaced three tools we used before.",
    name: "Priya Patel",
    role: "Engineering Lead",
  },
  {
    quote: "Support answered within minutes. That alone made us stay.",
    name: "Rohan Mehta",
    role: "Founder",
  },
];

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-base text-slate-600 sm:text-lg">{text}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      <main className="flex-1">
        <HeroSection />

        {/* Features */}
        <section id="features" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Features"
              title="Everything you need in one place"
              text="Powerful tools that stay out of your way, so you can focus on the work that matters."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-sm font-semibold text-indigo-700">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="services" className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How it works"
              title="Get started in three simple steps"
            />

            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-slate-600">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonials */}
        <section id="products" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by teams everywhere"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <blockquote className="text-sm text-slate-700 sm:text-base">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-indigo-600 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100 sm:text-base">
              Join thousands of teams already building better products. It's
              free to start, and no credit card is required.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/register"
                className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
              >
                Create free account
              </a>
              <a
                href="/login"
                className="rounded-lg border border-indigo-300 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Log in
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Home;