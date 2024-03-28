import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { SignIn } from "./Pages/SignIn"



function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes >
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
