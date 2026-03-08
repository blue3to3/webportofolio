import AdminSidebar from "./AdminSidebar"

function AdminLayout({ children }) {

  return (

    <div className="h-screen flex bg-[#F5F5F5]">

      {/* Sidebar (fixed) */}

      <div className="w-64 border-r bg-white fixed h-screen">

        <AdminSidebar />

      </div>

      {/* Content */}

      <div className="flex-1 ml-64 overflow-y-auto p-10">

        {children}

      </div>

    </div>

  )

}

export default AdminLayout