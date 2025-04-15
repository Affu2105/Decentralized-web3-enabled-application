import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import ComplaintForm from '../components/ComplaintForm';

import { Toaster  } from 'react-hot-toast';
function AddComplaint() {
  return (
    <>
    <Toaster  />

    <Navbar/>
    <ComplaintForm/>
    <Footer/>
    </>

  )
}

export default AddComplaint;