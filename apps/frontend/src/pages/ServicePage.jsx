import Footer from '@/components/Footer';
import NavbarStatic from "@/components/NavbarStatic";
import Borrowbook from "@/components/Service/BorrowBook";

export const ServicePage = () => {

  return (
    <>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <Borrowbook />

      <Footer />
    </>
  )
};
