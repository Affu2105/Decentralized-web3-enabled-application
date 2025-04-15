
import { AuroraHero } from '../components/Herosection';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Features from "../components/Features"
import PlatformWorkflow from "../components/How"
import RulesGuidelines from '../components/Rule';
function Home() {
  return (
    <>
    <Navbar/>
    <AuroraHero/>
    <Features/>
    <PlatformWorkflow/>
    <RulesGuidelines/>
    <Footer/>

    </>

  )
}

export default Home;