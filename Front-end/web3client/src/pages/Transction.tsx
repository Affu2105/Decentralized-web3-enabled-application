import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Toaster  } from 'react-hot-toast';
import Send from "../components/sendandrecive";
function TopComplaints() {
  return (
    <>
        <Toaster  />
    <Navbar/>
    <Send />
    <Footer/>
    </>

  )
}

export default TopComplaints;