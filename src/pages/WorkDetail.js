import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

function WorkDetail() {
  const { id } = useParams()
  const [work, setWork] = useState(null)

  useEffect(() => {
    const fetchWork = async () => {
      const docRef = doc(db, "works", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setWork(docSnap.data())
      }
    }

    fetchWork()
  }, [id])

  if (!work) return <div className="p-20">Loading...</div>

  return (
    <main className="bg-gray-50 px-10 py-20">
      <section className="bg-white rounded-2xl p-10 shadow-sm max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-semibold mb-4">
            {work.title}
          </h1>

          <p className="text-sm text-gray-400 mb-6">
            {work.category} — {work.year}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {work.description}
          </p>
        </div>
      </section>
    </main>
  )
}

export default WorkDetail
