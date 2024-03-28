import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { SignIn } from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"



function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
