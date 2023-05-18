import NavbarStatic from "@/components/NavbarStatic";
import JoinEvent from "@/components/Event/JoinEvent";
import Footer from '@/components/Footer';

export const EventPage = () => {

  return (
    <>
      <div className="fixed w-full h-full top-0 bg-[#ffffff] z-[-1]">
      </div>
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <JoinEvent />
      <Footer />
    </>
  )
};
