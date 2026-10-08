function NotFound() {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md text-center">
        <p className="text-7xl font-bold tracking-tight text-indigo-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved, renamed, or never existed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Back to home
          </a>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Go back
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Need help?{" "}
          <a
            href="/contact"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Contact support
          </a>
        </p>
      </div>
    </section>
  );
}

export default NotFound;