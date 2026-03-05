import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Works from "./pages/Works"
import WorkDetail from "./pages/WorkDetail"
import Contact from "./pages/Contact"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
     <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
          
          <div className="w-full max-w-[1200px] bg-white rounded-3xl shadow-md flex flex-col overflow-hidden">
            
            <Navbar />

            <div className="flex-grow">
              <AnimatedRoutes/>
            </div>
                
            <Footer />

          </div>
        </div>
    </BrowserRouter>
  )
}

export default App
