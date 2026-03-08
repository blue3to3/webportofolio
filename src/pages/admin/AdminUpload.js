import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase/config"
import AdminLayout from "../../components/admin/AdminLayout"
import toast from "react-hot-toast"

function AdminUpload() {

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleImageChange = (file) => {

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!title || !year || !type || !image) {
      toast.error("Please complete all fields")
      return
    }

    setLoading(true)

    let imageUrl = ""

    try {

      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "portfolio_upload")

      const uploadImage = () =>
        new Promise((resolve, reject) => {

          const xhr = new XMLHttpRequest()

          xhr.open(
            "POST",
            "https://api.cloudinary.com/v1_1/dalj9o8ip/image/upload"
          )

          xhr.upload.onprogress = (event) => {

            if (event.lengthComputable) {
              const percent = Math.round(
                (event.loaded * 100) / event.total
              )

              setProgress(percent)
            }

          }

          xhr.onload = () => {

            const response = JSON.parse(xhr.responseText)

            resolve(response.secure_url)

          }

          xhr.onerror = () => reject("Upload failed")

          xhr.send(formData)

        })

      imageUrl = await uploadImage()

      await addDoc(collection(db, "works"), {
        title,
        year,
        type,
        category,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
      })

      toast.success("Work uploaded")
      setProgress(0)
      setTitle("")
      setYear("")
      setType("")
      setCategory("")
      setDescription("")
      setImage(null)
      setPreview(null)

    } catch {

      toast.error("Upload failed")

    }

    setLoading(false)
  }

  return (
    <AdminLayout>

      <h1 className="text-3xl font-semibold mb-2">
        Upload Work
      </h1>

      <p className="text-gray-500 mb-10">
        Add new portfolio work
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

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:border-black transition">

          <p className="text-sm text-gray-500">
            Drag image here or click to upload
          </p>

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

          <div className="mt-4">

            <p className="text-xs text-gray-400 mb-2">
              Preview
            </p>

            <img
              src={preview}
              alt="preview"
              className="h-52 rounded-xl object-cover"
            />

          </div>

        )}

        {progress > 0 && (

          <div className="mt-4">

            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Uploading image</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        )}

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

export default AdminUpload