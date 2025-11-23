import chambers from "@/data/chambers.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Select a Chamber</h1>
      <div className="mt-4 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {chambers.map((item) => (
            <Link
              key={item.id}
              href={`/prescription/${item.id}`}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm opacity-90">{item.address}</p>
              <span className="absolute bottom-2 right-2 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
