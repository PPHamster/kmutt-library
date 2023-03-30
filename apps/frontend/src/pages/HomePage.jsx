import Navbar from "@/components/Navbar";
import Recommend from "@/components/Home/Recommend";
import { popup } from '@/utils/Popup';

export const HomePage = () => {
  const onBtnClick = () => {
    popup.fire({
      imageUrl: 'https://img1.picmix.com/output/stamp/normal/9/8/1/6/1776189_c45b6.gif',
      title: 'Bili Bili Guba!!',
      imageAlt: 'Gawr Gura Gif'
    })
  };

  return (
    <>
    <div>
      <Navbar/>
      <Recommend/>
        <div className="max-w-[700px] mx-auto text-center">
          <div className="text-white text-center text-6xl">Is Gubaaa!!</div>
          <img src="https://img1.picmix.com/output/stamp/normal/2/3/4/4/1774432_0219c.gif" className="mx-auto" />
          <button
            className="w-[150px] h-[45px] rounded-md border-black border-2 bg-cyan-100 hover:bg-cyan-600 font-bold text-2xl my-[20px] ease-out duration-300"
            onClick={onBtnClick}
          >Click ?</button>
        </div>
      </div>
    </>
  )
};
