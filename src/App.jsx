import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import About    from './pages/About'
import Packages from './pages/Packages'
import Booking  from './pages/Booking'
import Events   from './pages/Events'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/about"    element={<About />}    />
        <Route path="/packages" element={<Packages />} />
        <Route path="/booking"  element={<Booking />}  />
        <Route path="/events"   element={<Events />}   />
      </Routes>
    </BrowserRouter>
  )
}
