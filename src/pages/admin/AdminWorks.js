import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase/config"
import AdminLayout from "../../components/admin/AdminLayout"
import { Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

function AdminWorks() {

  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")

  const navigate = useNavigate()

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
    setLoading(false)
  }

  useEffect(() => {
    fetchWorks()
  }, [])

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this work?")) return

    await deleteDoc(doc(db, "works", id))

    toast.success("Work deleted")

    fetchWorks()
  }

  const handleEdit = (id) => {

    navigate(`/admin/edit/${id}`)

  }

  const filteredWorks = works.filter((work) => {

    const matchSearch = work.title
      ?.toLowerCase()
      .includes(search.toLowerCase())

    const matchType =
      filterType === "all" || work.type === filterType

    return matchSearch && matchType
  })

  return (
    <AdminLayout>

      <h1 className="text-3xl font-semibold mb-2">
        Works
      </h1>

      <p className="text-gray-500 mb-10">
        Manage portfolio works
      </p>

      {/* SEARCH + FILTER */}

      <div className="flex gap-6 mb-10">

        <input
          type="text"
          placeholder="Search works..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-b border-gray-300 py-2 focus:outline-none w-64"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border-b border-gray-300 py-2 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="mockup">Mockups</option>
          <option value="collection">Collections</option>
        </select>

      </div>

      {/* LOADING */}

      {loading && (
        <p className="text-gray-400">Loading works...</p>
      )}

      {/* EMPTY */}

      {!loading && filteredWorks.length === 0 && (
        <p className="text-gray-400">
          No works found
        </p>
      )}

      {/* WORK GRID */}

      <div className="grid md:grid-cols-3 gap-8">

        {filteredWorks.map((work) => (

          <div key={work.id} className="group">

            <div className="relative">

              <img
                src={work.imageUrl}
                alt={work.title}
                className="aspect-[3/4] object-cover rounded-xl"
              />

              {/* HOVER ACTION */}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6">

                <button
                  onClick={() => handleEdit(work.id)}
                  className="text-white"
                >
                  <Pencil size={20} />
                </button>

                <button
                  onClick={() => handleDelete(work.id)}
                  className="text-white"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>

            {/* TITLE */}

            <p className="mt-3 text-sm font-medium">
              {work.title}
            </p>

            {/* TYPE BADGE */}

            <div className="flex gap-2 mt-1">

              {work.type && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {work.type}
                </span>
              )}

              {work.category && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {work.category}
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>
  )
}

export default AdminWorks