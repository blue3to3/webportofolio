import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"
import useScrollReveal from "../hooks/useScrollReveal"

function Works() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useScrollReveal()

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const q = query(
          collection(db, "works"),
          orderBy("createdAt", "desc")
        )

        const snapshot = await getDocs(q)

        const worksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setWorks(worksData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching works:", error)
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  return (
    <main className="bg-gray-50 px-10 py-20">
      {/* Header */}
      <section className="reveal text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800">
          Portfolio
        </h1>

        <p className="mt-4 text-gray-500">
          Selected fashion design explorations.
        </p>
      </section>

      {/* Content */}
      <section className="reveal mt-16 bg-white rounded-2xl p-10 shadow-sm max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-400">Loading works...</p>
        ) : works.length === 0 ? (
          <p className="text-center text-gray-400">
            No works uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {works.map((work) => (
              <Link key={work.id} to={`/works/${work.id}`} className="group">
                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:opacity-90"
                  />
                </div>

                <div className="mt-4 flex justify-between items-baseline">
                  <h3 className="text-base font-medium">
                    {work.title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {work.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Works
