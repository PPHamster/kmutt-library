import Navbar from "@/components/Navbar";
import Recommend from "@/components/Home/Recommend";
import Service from "@/components/Home/Service";
import Aboutme from "@/components/Home/Aboutme";
import EventComponent from "@/components/Home/Event";
import Blog from "@/components/Home/Blog";
import { popup } from '@/utils/Popup';
import Footer from '@/components/Footer';

export const HomePage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Recommend />
        <Service />
        <Aboutme />
        <EventComponent />
        <Blog />
        <div className="max-w-[700px] mx-auto text-center">
          <img src="https://media.tenor.com/V9CD2EjxQkEAAAAi/tohru-cute.gif" className="mx-auto h-48" />
        </div>
      </div>
      <Footer />
    </>
  )
};
