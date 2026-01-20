import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        UI Experiments
      </h1>

      <ul className="space-y-2">
        <li>
          <Link
            to="/button"
            className="block p-4 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 transition w-60"
          >
            Submit Button Animation →
          </Link>
        </li>

        <li>
          <Link
            to="/checkbox"
            className="block p-4 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 transition w-60"
          >
            Motion Checkbox →
          </Link>
        </li>
        <li>
           <Link
            to="/rating"
            className="block p-4 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 transition w-60"
          >
           Rating →
          </Link>
        </li>
      </ul>
    </div>
  );
}
