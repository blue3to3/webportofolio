import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/admin/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-md px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
