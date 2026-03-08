import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Image, Upload, LogOut } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"

function AdminSidebar() {

  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/admin")
  }

  const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition"

  const activeStyle =
    "bg-black text-white"

  const normalStyle =
    "text-gray-600 hover:bg-gray-100"

  return (
    <div className="w-64 bg-white border-r shadow-sm h-screen flex flex-col justify-between p-6">

      <div>

        {/* Title */}

        <h2 className="text-lg font-semibold mb-10">
          Jasson Admin
        </h2>

        {/* Menu */}

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/works"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Image size={18} />
            Works
          </NavLink>

          <NavLink
            to="/admin/upload"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            <Upload size={18} />
            Upload Work
          </NavLink>

        </nav>

      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  )
}

export default AdminSidebar