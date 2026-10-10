import { useEffect, useState } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", active: true },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Users", href: "/dashboard/users" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Settings", href: "/dashboard/settings" },
];

const stats = [
  { label: "Total revenue", value: "$48,250", change: "+12.5%", up: true },
  { label: "New users", value: "1,284", change: "+8.2%", up: true },
  { label: "Orders", value: "642", change: "-3.1%", up: false },
  { label: "Conversion", value: "4.6%", change: "+0.9%", up: true },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthlySales = [35, 48, 42, 60, 55, 72, 65, 80, 70, 88, 76, 95];

const orders = [
  { id: "#1042", customer: "Aarav Sharma", amount: "$320.00", status: "Paid" },
  { id: "#1041", customer: "Priya Patel", amount: "$145.50", status: "Pending" },
  { id: "#1040", customer: "Rohan Mehta", amount: "$89.99", status: "Paid" },
  { id: "#1039", customer: "Sneha Iyer", amount: "$512.00", status: "Failed" },
  { id: "#1038", customer: "Vikram Singh", amount: "$230.75", status: "Paid" },
];

const activity = [
  { text: "New user registered", time: "2 min ago" },
  { text: "Order #1042 was paid", time: "18 min ago" },
  { text: "Payment failed for #1039", time: "1 hr ago" },
  { text: "Weekly report generated", time: "3 hr ago" },
];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile sidebar on Escape
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-left">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-[transform,visibility] duration-300 lg:visible lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            L
          </span>
          <span className="text-lg font-semibold text-slate-900">Logo</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Dashboard">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              aria-current={item.active ? "page" : undefined}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <a
            href="/login"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Log out
          </a>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Overview
          </h1>

          <div className="ml-auto flex items-center gap-3">
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="hidden w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 md:block lg:w-64"
            />
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                JD
              </span>
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                John Doe
              </span>
            </div>
          </div>
        </header>

        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Stat cards */}
          <section
            aria-label="Key metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    stat.up ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}{" "}
                  <span className="font-normal text-slate-400">vs last month</span>
                </p>
              </div>
            ))}
          </section>

          {/* Chart + activity */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
              <h2 className="text-base font-semibold text-slate-900">
                Sales this year
              </h2>
              <div className="mt-6 flex h-56 items-end gap-1.5 sm:gap-3">
                {monthlySales.map((value, i) => (
                  <div
                    key={months[i]}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      style={{ height: `${value}%` }}
                      title={`${months[i]}: ${value}k`}
                      className="w-full rounded-t bg-indigo-500 transition hover:bg-indigo-600"
                    />
                    <span className="text-[10px] text-slate-500 sm:text-xs">
                      {months[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Recent activity
              </h2>
              <ul className="mt-4 space-y-4">
                {activity.map((item) => (
                  <li key={item.text} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    <div>
                      <p className="text-sm text-slate-700">{item.text}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Orders table */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Recent orders
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-120 text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 pr-4 font-medium">Order</th>
                    <th className="py-3 pr-4 font-medium">Customer</th>
                    <th className="py-3 pr-4 font-medium">Amount</th>
                    <th className="py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 pr-4 font-medium text-slate-900">
                        {order.id}
                      </td>
                      <td className="py-3 pr-4 text-slate-700">
                        {order.customer}
                      </td>
                      <td className="py-3 pr-4 text-slate-700">
                        {order.amount}
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;