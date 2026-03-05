import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { auth, db } from "../../firebase/config"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Dashboard() {
  const navigate = useNavigate()

  const [works, setWorks] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("")
  
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  // Protect admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/admin")
    })
    return () => unsub()
  }, [navigate])

  // Fetch works sorted
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

  useEffect(() => {
    fetchWorks()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/admin")
  }

  const resetForm = () => {
    setTitle("")
    setYear("")
    setCategory("")
    setDescription("")
    setImage(null)
    setPreview(null)
    setEditingId(null)
  }

  const handleImageChange = (file) => {
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleImageChange(file)
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  const newErrors = {}

  if (!title.trim()) newErrors.title = "Title is required"
  if (!year.trim()) newErrors.year = "Year is required"
  if (!category) newErrors.category = "Category is required"
  if (!description.trim()) newErrors.description = "Description is required"

  if (!editingId && !image) {
    newErrors.image = "Image is required"
  }

  if (year && !/^\d{4}$/.test(year)) {
    newErrors.year = "Year must be 4 digits"
  }

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) {
    toast.error("Please complete all required fields")
    return
  }

  setLoading(true)

  let imageUrl = preview

    try {
      // Upload image if new file selected
      if (image) {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "portfolio_upload")

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dalj9o8ip/image/upload",
          {
            method: "POST",
            body: formData,
          }
        )

        const data = await response.json()
        imageUrl = data.secure_url
      }

      if (editingId) {
        await updateDoc(doc(db, "works", editingId), {
          title,
          year,
          category,
          description,
          imageUrl,
        })
        toast.success("Work updated")
      } else {
        await addDoc(collection(db, "works"), {
          title,
          year,
          category,
          description,
          imageUrl,
          createdAt: serverTimestamp(),
        })
        toast.success("Work uploaded")
      }

      await fetchWorks()
      resetForm()
      setErrors({})
    } catch {
      toast.error("Something went wrong")
    }

    setLoading(false)
  }

  const handleEdit = (work) => {
    setTitle(work.title)
    setYear(work.year)
    setCategory(work.category)
    setDescription(work.description)
    setPreview(work.imageUrl)
    setEditingId(work.id)
    setImage(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this work?")) return
    await deleteDoc(doc(db, "works", id))
    toast.success("Work deleted")
    fetchWorks()
  }

  const filteredWorks = works.filter((work) => {
    const matchesSearch = work.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      filterCategory === "All" ||
      work.category === filterCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center p-8">
      <div className="w-full max-w-[1200px] bg-white rounded-3xl border border-gray-200 p-12 fade-in">

        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-serif tracking-tight">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Logout
          </button>
        </div>

        {/* FORM */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">
            {editingId ? "Edit Work" : "Add New Work"}
          </h2> 

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Title"
              className={`w-full border-b py-2 focus:outline-none luxury-input ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
                <p className="text-xs text-red-400 mt-1 error-fade">{errors.title}</p>
            )}

            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Year"
                className={`w-full border-b py-2 focus:outline-none luxury-input ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errors.year && (
                <p className="text-xs text-red-400 mt-1 error-fade">{errors.year}</p>
              )}

              <select
                className="border-b border-gray-300 py-2 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                <option value="Sweatpants">Sweatpants</option>
                <option value="Tee">Tee</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Sweater">Sweater</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-400 mt-1 error-fade">{errors.category}</p>
              )}
            </div>

            <textarea
              rows="3"
              placeholder="Description"
              className={`w-full border-b py-2 focus:outline-none luxury-input ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
                <p className="text-xs text-red-400 mt-1 error-fade">{errors.description}</p>
            )}

            {/* Drag & Click Upload */}
            <label
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="block border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 cursor-pointer"
            >
              Drag image or click to select
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e.target.files[0])
                }
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-40 rounded-lg object-cover"
              />
            )}
            {errors.image && (
                <p className="text-xs text-red-400 mt-2 error-fade">{errors.image}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : editingId ? (
                "Update Work"
              ) : (
                "Upload Work"
              )}
            </button>

          </form>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by title..."
            className={`w-full border-b py-2 focus:outline-none luxury-input ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border-b border-gray-300 py-2 focus:outline-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Sweatpants">Sweatpants</option>
            <option value="Tee">Tee</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Sweater">Sweater</option>
          </select>
        </div>

        {/* WORKS LIST */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredWorks.map((work) => (
            <div key={work.id}>
              <img
                src={work.imageUrl}
                alt={work.title}
                className="aspect-[3/4] object-cover rounded-xl mb-4 hover-scale"
              />

              <div className="flex justify-between items-center text-sm">
                <span>{work.title}</span>
                <div className="flex gap-4 text-sm">
                  <button 
                    onClick={() => handleEdit(work)}
                    className="text-blue-600 hover:underline"
                  >       
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
