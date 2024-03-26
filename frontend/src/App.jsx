import { BrowserRouter } from "react-router-dom"
import { BottomWarning } from "./Components/BottomWarning"
import { Heading } from "./Components/Heading"
import { InputBox } from "./Components/InputBox"
import { SubHeading } from "./Components/Subheading"
import { Button } from "./Components/Button"


function App() {


  return (
    <div>
      <BrowserRouter>
      
       <Heading label={"Heading"}/> 
       <SubHeading label={"Subheading"} />
       <InputBox label={"FirstName"} placeHolder={"Placeholder"} onChange={"onChange"}/>
       <BottomWarning label={"label"} to={"/Link"} buttonText={"Button Text"}/>
        <Button label={"Button"} onClick={"/Home"}/>
       </BrowserRouter>
    </div>
  )
}

export default App
