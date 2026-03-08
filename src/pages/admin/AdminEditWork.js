import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import AdminLayout from "../../components/admin/AdminLayout"
import toast from "react-hot-toast"

function AdminEditWork() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchWork = async () => {

      const ref = doc(db, "works", id)

      const snapshot = await getDoc(ref)

      const data = snapshot.data()

      setTitle(data.title)
      setYear(data.year)
      setType(data.type)
      setCategory(data.category || "")
      setDescription(data.description)
      setImageUrl(data.imageUrl)

      setLoading(false)
    }

    fetchWork()

  }, [id])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const ref = doc(db, "works", id)

    await updateDoc(ref, {
      title,
      year,
      type,
      category,
      description
    })

    toast.success("Work updated")

    navigate("/admin/works")

  }

  if (loading) return <p>Loading...</p>

  return (
    <AdminLayout>

      <h1 className="text-3xl font-semibold mb-2">
        Edit Work
      </h1>

      <p className="text-gray-500 mb-10">
        Update portfolio work
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-10 max-w-3xl mx-auto space-y-8"
      >

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-xs text-gray-400 mb-1">Title</p>
            <input
              type="text"
              placeholder="Work title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Year</p>
            <input
              type="text"
              placeholder="2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-xs text-gray-400 mb-1">Work Type</p>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setCategory("")
              }}
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="mockup">Custom Mockup</option>
              <option value="collection">Design Collection</option>
            </select>
          </div>

          {type === "mockup" && (

            <div>
              <p className="text-xs text-gray-400 mb-1">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none"
              >
                <option value="">Select category</option>
                <option value="belt">Belt</option>
                <option value="hats">Hats</option>
                <option value="hoodie">Hoodie</option>
                <option value="hoodie zip">Hoodie Zip</option>       
                <option value="jeans">Jeans</option>
                <option value="pants">Pants</option>
                <option value="tee">Tee</option>
                <option value="tracksuit">Tracksuit</option>               
              </select>
            </div>

          )}

        </div>
        
        <div>
          <p className="text-xs text-gray-400 mb-2">
            Description
          </p>

          <textarea
            rows="4"
            placeholder="Short description about the design"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none"
          />
        </div>

        <img
          src={imageUrl}
          alt="preview"
          className="h-40 rounded-lg object-cover"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Uploading..." : "Upload Work"}
        </button>

      </form>

    </AdminLayout>
  )
}

export default AdminEditWork