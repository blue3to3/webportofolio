import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"

function Works() {

  const [works, setWorks] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {

    const fetchWorks = async () => {

      const q = query(
        collection(db, "works"),
        orderBy("createdAt", "desc")
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

  const filteredWorks = works.filter((work) => {

    if (filter === "all") return true

    return work.type === filter
  })

  return (

    <div className="px-12 py-16">

      <h1 className="text-4xl font-semibold mb-8">
        Portfolio
      </h1>

      {/* FILTER */}

      <div className="flex gap-6 text-sm mb-12">

        <button
          onClick={() => setFilter("all")}
          className={`${
            filter === "all" ? "text-black" : "text-gray-400"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("mockup")}
          className={`${
            filter === "mockup" ? "text-black" : "text-gray-400"
          }`}
        >
          Mockups
        </button>

        <button
          onClick={() => setFilter("collection")}
          className={`${
            filter === "collection" ? "text-black" : "text-gray-400"
          }`}
        >
          Collections
        </button>

      </div>

      {/* GRID */}

      <div className="columns-1 md:columns-2 gap-10">

        {filteredWorks.map((work) => (

          <Link
            key={work.id}
            to={`/works/${work.id}`}
            className="group block mb-10 break-inside-avoid"
          >

            <div className="relative overflow-hidden rounded-xl">

              <div className="aspect-[3/4] overflow-hidden rounded-xl">

                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

              </div>

              {/* Hover overlay */}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                <p className="text-white text-sm tracking-widest uppercase">
                  View Project
                </p>

              </div>

            </div>

            <p className="mt-3 text-sm tracking-wide">
              {work.title}
            </p>

          </Link>

        ))}

      </div>

    </div>
  )
}

export default Works