import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import AdminLayout from "../../components/admin/AdminLayout"

function AdminDashboard() {

  const [totalWorks, setTotalWorks] = useState(0)
  const [mockups, setMockups] = useState(0)
  const [collections, setCollections] = useState(0)
  const [recentWorks, setRecentWorks] = useState([])

  useEffect(() => {

    const fetchStats = async () => {

      const snapshot = await getDocs(collection(db, "works"))

      const data = snapshot.docs.map((doc) => doc.data())

      setTotalWorks(data.length)

      const mockupCount = data.filter(
        (work) => work.type === "mockup"
      ).length

      const collectionCount = data.filter(
        (work) => work.type === "collection"
      ).length

      setMockups(mockupCount)
      setCollections(collectionCount)

      setRecentWorks(data.slice(0, 4))
    }

    fetchStats()

  }, [])

  return (
    <AdminLayout>

      <h1 className="text-3xl font-semibold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-10">
        Overview of your portfolio
      </p>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-14">

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-400">Total Works</p>
          <h2 className="text-2xl font-semibold">{totalWorks}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-400">Mockups</p>
          <h2 className="text-2xl font-semibold">{mockups}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-400">Collections</p>
          <h2 className="text-2xl font-semibold">{collections}</h2>
        </div>

      </div>

      {/* RECENT WORKS */}

      <h2 className="text-xl font-semibold mb-6">
        Recent Works
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {recentWorks.map((work, index) => (

          <div key={index}>

            <img
              src={work.imageUrl}
              alt={work.title}
              className="aspect-[3/4] object-cover rounded-xl"
            />

            <p className="mt-2 text-sm">
              {work.title}
            </p>

          </div>

        ))}

      </div>

    </AdminLayout>
  )
}

export default AdminDashboard