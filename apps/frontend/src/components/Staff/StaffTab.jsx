import { useState } from "react";
import StaffBook from '@/components/Staff/StaffBook'

function StaffTab() {
    const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);

    const toggleAccordion = (index) => {
        setActiveAccordionIndex(activeAccordionIndex === index ? -1 : index);
    };

    const accordions = [
        {
            title: "Book",
            content:
                <StaffBook />,
        },
        {
            title: "Room",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            title: "Event",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            title: "Blog",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    ];

    return (
        <div className="pt-[15vh] w-[80%] mx-[10%] mb-[12.8%]">
            {accordions.map((accordion, index) => (
                <div
                    key={index}
                    className=" bg-gray-200 border  rounded-md "
                >
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left py-[20px] px-[5%] text-[#454545] font-medium font-kanit text-2xl hover:bg-gray-300"
                    >
                        {accordion.title}<span className="absolute right-[14%]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
</span>
                    </button>
                    <div
                        className={`${activeAccordionIndex === index ? "block" : "hidden"
                            } px-4 py-3 h-[850px] bg-white`}
                    >
                        <p className="text-gray-700">{accordion.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StaffTab;
