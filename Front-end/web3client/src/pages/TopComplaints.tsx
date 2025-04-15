import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Toaster  } from 'react-hot-toast';
import TopComplaint from "../components/TopComplaint";
function TopComplaints() {
  return (
    <>
        <Toaster  />
    <Navbar/>
    <TopComplaint />
    <Footer/>
    </>

  )
}

export default TopComplaints;