import Navbar from "@/components/Navbar";
import JoinEvent from "@/components/Event/JoinEvent";

export const EventPage = () => {

    return (
        <>
            <div>
                <Navbar />
                <JoinEvent />
                <footer>
                    <div className="flex flex-col w-full h-[150px] bg-[#8D4120] columns-2">
                        <div className="mt-6 ml-40">
                            <p className="font-semi-bold font-poppins text-white text-lg">CONTACT US</p>
                            <div className="columns-2">
                                <p className="font-regular font-roboto text-white text-md">
                                    Tel. 02-423-5522 {<br />}
                                    Email : kmutt_library@kmutt.ac.th
                                </p>
                                <p className="font-regular font-roboto text-white text-md">
                                    Location : 91 ถนน พุทธบูชา {<br />}
                                    แขวงบางมด เขตทุ่งครุ {<br />}
                                    กรุงเทพมหานคร 10140
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
};