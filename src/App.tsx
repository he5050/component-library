import { Routes, Route } from "react-router-dom"
import PreviewPage from "./pages/PreviewPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preview/:component" element={<PreviewPage />} />
    </Routes>
  )
}

export default App
