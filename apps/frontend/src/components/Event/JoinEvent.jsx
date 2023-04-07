import React , { useState } from 'react';
import Event from '@/components/Eventlist'
import Eventpopup from '@/components/EventPopup'

export default function JoinEvent() {

    const [selectedEvent, setSelectedEvent] = useState(false)
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const eventdata = [
        {
            eventid: 'EV01',
            image: "./image/PAX.jpg",
            eventname: "กิจกรรมแลกเปลี่ยนความคิดเห็นหนังสือเรื่อง “Pax”",
            category: 'กิจกรรมแลกเปลี่ยนความคิดเห็นหลังการอ่านหนังสือ',
            host: 'd. chamberlin',
            eventdes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            location: 'Floor 4, Room 2',
        },
        {
            eventid: 'EV02',
            image: "./image/kmutt_library.jpg",
            eventname: "กิจกรรมแลกเปลี่ยนความคิดเห็นหนังสือเรื่อง “Kmutt library”",
            category: 'กิจกรรมแลกเปลี่ยนความคิดเห็นหลังการอ่านหนังสือ',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {
            eventid: 'EV03',
            image: "./image/kmutt_library.jpg",
            eventname: "example event3",
            category: 'กิจกรรมแลกเปลี่ยนความคิดเห็นหลังการอ่านหนังสือ',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {
            eventid: 'EV04',
            image: "./image/Eventimg.jpg",
            eventname: "example event4",
            category: 'กิจกรรมแลกเปลี่ยนความคิดเห็นหลังการอ่านหนังสือ',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {
            eventid: 'EV05',
            image: "./image/kmutt_library.jpg",
            eventname: "example event5",
            category: 'กิจกรรมแลกเปลี่ยนความคิดเห็นหลังการอ่านหนังสือ',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
    ]

    return (
        <>
            <div className="w-full h-[700px] mt-[5rem] pt-[2rem] px-[8rem] max-sm:px-[20px] max-lg:px-[4rem]">
                <div className="w-full ">
                    <h1 className='font-bold font-kanit text-3xl text-[#454545] ml-[30px]'>เข้าร่วมกิจกรรม</h1>
                    <div className="w-full h-auto m-auto drop-shadow-md pt-10 ">
                        {eventdata.map((data) => {
                            return (
                                <Event
                                    key={data.eventid}
                                    eventimage={data.image}
                                    eventname={data.eventname}
                                    category={data.category}
                                    host={data.host}
                                    eventdes={data.eventdes}
                                    location={data.location}
                                    onClick={() => handleEventClick(data)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            {selectedEvent && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-40">
                    <Eventpopup
                        event={selectedEvent}
                        onClose={() => handleEventClick(null)}
                        open={selectedEvent !== null}
                    />
                </div>
            )}
        </>
    )
}
