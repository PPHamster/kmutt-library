import React from "react";

export default function Aboutme() {

  return (
    <>
      <div className="flex flex-row w-full h-[700px] mt-[9rem] pl-[8rem]">
        <div className="flex flex-col">
          <h1 className='font-bold font-roboto text-5xl text-[#454545] ml-[30px]'>About Library</h1>
          <p className='w-[45vw] whitespace-normal font-normal font-kanit text-2xl text-[#454545] mt-8'>
            In the halls of King Mongkut's grand domain,
            Where knowledge thrives and wisdom's reign,
            Stands a library, a treasure trove,
            Where seekers of learning come to rove.
          </p>
          <p className='w-[45vw] whitespace-normal font-normal font-kanit text-2xl text-[#454545] mt-8'>
            The KMUTT Library, a haven of books,
            With shelves adorned in endless looks,
            Whispering secrets, tales untold,
            Within its walls, a world unfolds.
          </p>
          <p className='w-[45vw] whitespace-normal font-normal font-kanit text-2xl text-[#454545] mt-8'>
            Books of science, art, and history,
            Pages filled with scholarly mystery,
            Engineering feats and technological wonders,
            Ideas that spark, like celestial thunders.
          </p>
          <p className='w-[45vw] whitespace-normal font-normal font-kanit text-2xl text-[#454545] mt-8'>
            From business to humanities, a vast array,
            Disciplines embraced in the library's sway,
            Each tome a gateway to new frontiers,
            Expanding minds, quenching intellectual thirst.
          </p>
        </div>
        <div className="mt-[7rem]">
          <img src="/image/image2.jpg" className="absolute right-[10%]" />
        </div>
      </div>
    </>
  )
};
