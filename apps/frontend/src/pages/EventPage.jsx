import NavbarStatic from "@/components/NavbarStatic";
import JoinEvent from "@/components/Event/JoinEvent";
import Eventpopup from "@/components/EventPopup";

export const EventPage = () => {

    return (
        <>
            
            <div className="fixed w-full h-full top-0 bg-[#FFD4D4] z-[-1]">
            </div>
                <NavbarStatic
                    bgcolor='bg-[#a88b8b]'
                    textcolor='text-white'
                />
                <JoinEvent />
                <Eventpopup />
                <footer>
                    <div className="flex flex-col w-full h-[150px] bg-[#8D4120] columns-2 max-sm:h-[120px]">
                        <div className="mt-6 ml-40">
                            <p className="font-semi-bold font-poppins text-white text-lg max-sm:text-base">CONTACT US</p>
                            <div className="columns-2">
                                <p className="font-regular font-roboto text-white text-base max-sm:text-xs">
                                    Tel. 02-423-5522 {<br />}
                                    Email : kmutt_library@kmutt.ac.th
                                </p>
                                <p className="font-regular font-kanit text-white text-base max-sm:text-xs">
                                    Location : 91 ถนน พุทธบูชา {<br />}
                                    แขวงบางมด เขตทุ่งครุ {<br />}
                                    กรุงเทพมหานคร 10140
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            
        </>
    )
};