import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import ManualEntry from './pages/ManualEntry'
import Result from './pages/Result'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/manual" element={<ManualEntry />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App

