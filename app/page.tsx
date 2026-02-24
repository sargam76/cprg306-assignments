import Link from "next/link";

const weeks = ["week-2", "week-3", "week-4", "week-5", "week-6"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-10 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">CPRG 306 - Web Development 2</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {weeks.map((week) => (
          <Link key={week} href={`/${week}`}
            className="w-40 h-40 flex items-center justify-center rounded-2xl
                       bg-gradient-to-br from-pink-500 to-rose-500
                       hover:from-rose-600 hover:to-pink-600
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
            <span className="text-lg font-semibold capitalize">{week}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}