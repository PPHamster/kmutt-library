import React , {useState} from 'react';
import Bookpopup from './Bookoverlay';

export default function Book(props) {
    
    const [OpenPopup, SetOpenPopup] = useState(false)
    // image styles
    const imageStyle = 'h-[265px] w-[225px] rounded-lg object-scale-down';
    return (
        <div className='box-content h-[450px] w-[275px] pr-[25px] pl-[25px] bg-transparent'>
            <section className='h-[400px] w-[275px] bg-white rounded-lg p-[25px] select-none mr-10'>
                <img src={props.image} className={imageStyle}/>
                <p className='font-bold font-roboto text-[#696969] text-lg'>{props.bookname}</p>
                <button
                    className="w-[135px] h-[40px] rounded-md bg-cyan-500 hover:bg-cyan-700 font-bold font-poppins text-white text-xl my-[20px] ease-out duration-300"
                    onClick={() => SetOpenPopup(true)}
                    >see more</button>
                <Bookpopup 
                    open={OpenPopup} 
                    onClose={() => SetOpenPopup(false)}
                    pbookname={props.bookname}
                    image={props.image}
                    pcategory={props.category}
                    ptype={props.type}
                    pauthor={props.author}
                    pstory={props.story}
                />
            </section>
        </div>
    )
}