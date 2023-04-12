import React from 'react'

export default function RoomforSt(props) {
    let imageStyle = 'h-[170px] w-[200px] rounded-sm object-scale-down';
    
    return (
        <div className='h-[240px] w-[500px] bg-transparent'>
            <section className='h-[350px] w-[250px] bg-white rounded-[0.55rem] p-[25px] select-none drop-shadow-md hover:drop-shadow-lg'>
                <div className=''>
                    <img src={props.image} className={imageStyle} alt='book cover' draggable="false"/>
                    <div className='ml-4 mr-4'>
                        <p className='font-regular font-kanit text-[#696969] whitespace-normal mt-2 text-md'>ห้อง</p>
                        <p className='font-bold font-roboto text-[#696969] whitespace-normal text-lg text-center '>{props.roomname}</p>
                        <button
                    className="absolute -translate-x-8 -translate-y-[2px] w-[80px] h-[35px] ml-[44px] rounded-full border-2 bg-[#0092BF]  hover:bg-[#007396] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
                    onClick={props.onClick}
                    >edit
                </button>
                <button
                    className="absolute translate-x-16 -translate-y-1 w-auto p-[10px] ml-[44px] rounded-full bg-[#F44336] border-2 hover:bg-[#c5342a] font-regular font-poppins text-white text-md mt-[16px] ease-out duration-300"
                    onClick={props.onClick}
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

                    </div>                    
                </div>


            </section>
        </div>
  )
}
