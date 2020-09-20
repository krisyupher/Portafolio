import React, { useState } from "react"
import Hero from "../components/Hero"
import Explorer from "../components/Explorer"
import Countriesflag from "../components/Countriesflag"
import Termianal from "../components/Termianal"
//style
import "../styles/containers/Home.css"
// import AboutMe from "../components/AboutMe"
const Home = () => {
  const [explorerLink, setExplorerLink] = useState("")
  return (
    <div className="HomeContainer">
      {/* <Explorer stateExplorer={setExplorerLink} /> */}
      {explorerLink === "" && <Hero />}
      {explorerLink === "countriesflag" &&
        <div className="sectionViewAndterminal">
          <Countriesflag />
          <Termianal/>
        </div>}
      {console.log("explorerLink", explorerLink)}
    </div>
  )
}
export default Home