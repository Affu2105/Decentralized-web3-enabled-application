import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Toaster  } from 'react-hot-toast';
import TopNews from "../components/NewsApi";
function TopComplaints() {
  return (
    <>
        <Toaster  />
    <Navbar/>
    <TopNews />
    <Footer/>
    </>

  )
}

export default TopComplaints;