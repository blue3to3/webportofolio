import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="px-10 py-6 flex justify-between items-center border-b border-gray-100">
      
      <Link to="/" className="font-semibold text-lg">
        Jassonthedesigner
      </Link>

      <div className="hidden md:flex gap-8 text-sm text-gray-500">
        <Link to="/about" className="hover:text-black transition">
          About
        </Link>
        <Link to="/works" className="hover:text-black transition">
          Portfolio
        </Link>
      </div>

      <Link
        to="/contact"
        className="bg-gray-100 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
      >
        Let’s talk
      </Link>

    </nav>
  )
}

export default Navbar
