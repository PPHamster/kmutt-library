import React from 'react'
import Event from '@/components/Eventlist'

export default function JoinEvent() {

    const eventdata = [
        {   
            eventid: 'EV01',
            image: "./image/PAX.jpg",
            eventname: "example event1",
            category: 'Talk',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {   
            eventid: 'EV02',
            image: "./image/kmutt_library.jpg",
            eventname: "example event2",
            category: 'Talk',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {   
            eventid: 'EV03',
            image: "./image/kmutt_library.jpg",
            eventname: "example event3",
            category: 'Talk',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {   
            eventid: 'EV04',
            image: "./image/Eventimg.jpg",
            eventname: "example event4",
            category: 'Talk',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
        {   
            eventid: 'EV05',
            image: "./image/kmutt_library.jpg",
            eventname: "example event5",
            category: 'Talk',
            host: 'd. chamberlin',
            eventdes: 'Oh wow SQL',
            location: 'Floor 4, Room 2',
        },
    ]

    return (
        <div className=" w-full h-[700px] mt-[9rem] px-[8rem]">
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
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
