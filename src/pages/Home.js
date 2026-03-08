import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"

function Home() {

  const [works, setWorks] = useState([])

  useEffect(() => {

    const fetchWorks = async () => {

      const q = query(
        collection(db, "works"),
        orderBy("createdAt", "desc"),
        limit(4)
      )

      const snapshot = await getDocs(q)

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setWorks(data)
    }

    fetchWorks()

  }, [])

  return (

    <div>

      {/* HERO */}

      <section className="px-12 pt-20 pb-24">

        <h1 className="text-5xl font-semibold leading-tight max-w-3xl mb-6">
          Fashion Design Portfolio
        </h1>

        <p className="text-gray-500 max-w-xl text-lg">
          A curated selection of custom mockups and design collections
          exploring modern silhouettes, textures, and visual identity.
        </p>

      </section>

      {/* SELECTED WORKS */}

      <section className="px-12 pb-24">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-2xl font-semibold">
            Selected Works
          </h2>

          <Link
            to="/works"
            className="text-sm text-gray-500 hover:text-black"
          >
            View All
          </Link>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {works.map((work) => (

            <Link
              key={work.id}
              to={`/works/${work.id}`}
              className="group"
            >

              <div className="aspect-[4/5] overflow-hidden rounded-xl">

                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <p className="mt-3 text-sm">
                {work.title}
              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* ABOUT PREVIEW */}

      <section className="px-12 pb-24">

        <div className="max-w-xl">

          <h2 className="text-2xl font-semibold mb-4">
            About
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            I am a 22-year-old fashion designer from Indonesia,
            specializing in design development with a strong
            emphasis on character, detail, and refined visual
            quality.
          </p>

          <Link
            to="/about"
            className="text-sm underline"
          >
            Read More
          </Link>

        </div>

      </section>

    </div>
  )
}

export default Home