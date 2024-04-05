import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { SignIn } from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"
import { SendMoney } from "./Pages/SendMoney"
import { Balance } from "./Pages/Balance"
import { AppBar } from "./Components/AppBar"




function App() {


  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <AppBar />
          <Routes >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/balance" element={<Balance />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
