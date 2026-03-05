import previewImage from "../assets/collection-preview.jpg.jpeg"
import { Link } from "react-router-dom"
import useScrollReveal from "../hooks/useScrollReveal"

function Home() {
  useScrollReveal()
  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="reveal text-center px-10 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800">
          Design with Character
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-500 leading-relaxed">
          A fashion design portfolio exploring silhouette, material, and
          proportion with refined visual sensitivity.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/works"
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700 transition"
          >
            View Portfolio
          </Link>

          <Link
            to="/about"
            className="bg-gray-200 px-6 py-2 rounded-md text-sm hover:bg-gray-300 transition"
          >
            About Me
          </Link>
        </div>
      </section>

       {/* IMAGE BOX */}
      <section className="reveal px-10 pb-24">
        <div className="bg-white rounded-3xl p-10 border border-gray-200 max-w-[1200px] mx-auto fade-in">

          <Link to="/works" className="group block">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={previewImage}
                alt="Collection Preview"
                className="w-full h-auto object-cover hover-scale"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURE BLOCK STYLE (adapted to works preview) */}
      <section className="reveal px-10 pb-20">
        <div className="bg-white rounded-2xl p-10 shadow-sm">
  
          <h2 className="text-2xl font-semibold mb-4">
            Selected Work Preview
          </h2>

          <p className="text-gray-500 leading-relaxed max-w-xl">
            A curated selection of fashion design projects including
            sweatpants, tee, hoodie, and sweater explorations.
          </p>
        </div>
      </section>

    </main>
  )
}

export default Home
