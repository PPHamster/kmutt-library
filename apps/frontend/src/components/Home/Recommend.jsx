import React , { useState } from 'react';
import Book from '@/components/Book';
import Bookpopup from '@/components/Bookoverlay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Recommend() {

    const [selectedBook, setSelectedBook] = useState(null)
    const handleBookClick = (book) => {
        setSelectedBook(book);
      };
      const renderPrevButton = ({ isDisabled }) => {
        return <span style={{ opacity: isDisabled ? '0.5' : 1 }}>&lt;</span>;
    };
    
    const renderNextButton = ({ isDisabled }) => {
        return <span style={{ opacity: isDisabled ? '0.5' : 1 }}>&gt;</span>;
    };

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
        1280: { items: 4 },
        1440: { items: 5,
             itemsFit: 'contain',},
    };

    //dummy data test template
    const bookdata = [
        {   
            bookid: 'M01',
            image: "./bookimages/chainsawman_volume_1.jpg",
            bookname: "Chainsawman vol. 1",
            category: ['English','Action','Comedy'],
            type: 'Manga',
            publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
            author: 'Fujimoto, Tatsuki',
            story: "Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous—Chainsaw Man! Denji's a poor young man who'll do anything for money, even hunting down devils with his pet devil Pochita. He's a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he's betrayed by someone he trusts. Now with the power of a devil inside him, Denji's become a whole new man—Chainsaw Man!",
        },
        {   
            bookid: 'M02',
            image: "./bookimages/kaguya_sama_love_is_war_volume_1.jpg",
            bookname: "Kaguya sama love is war vol. 1",
            category: ['English','Comedy','Romatic'],
            type: 'Manga',
            publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
            author: 'Akasaka, Aka',
            story: "All's fair when love is war! Two prideful geniuses locked in battle. Who will make the first misstep and in doing so...confess their love? Kaguya Shinomiya and Miyuki Shirogane are two geniuses who stand atop their prestigious academy's student council, making them the elite among elite. But it's lonely at the top and each has fallen for the other. There's just one huge problem standing in the way of lovey-dovey bliss—they're both too prideful to be the first to confess their romantic feelings and thus become the 'loser' in the competition of love! And so begins their daily schemes to force the other to confess first! A romantic comedy featuring the hilarious antics of geniuses in love.",
        },
        {   
            bookid: 'M03',
            image: "./bookimages/chainsawman_volume_5.jpg",
            bookname: "Chainsawman vol. 5",
            category: ['English','Action','Comedy'],
            type: 'Manga',
            publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
            author: 'Fujimoto, Tatsuki',
            story: "Denji’s a poor young man who’ll do anything for money, even hunting down devils with his pet devil Pochita. He’s a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he’s betrayed by someone he trusts. Now with the power of a devil inside him, Denji’s become a whole new man—Chainsaw Man!",
        },
        {   
            bookid: 'M04',
            image: "./bookimages/Miss_Kobayashi's_Dragon_Maid_Volume_1.jpg",
            bookname: "Miss kobayashi's Dragon maid vol. 1",
            category: ['English','Comedy','Slice of life'],
            type: 'Manga',
            publisher: 'Seven Seas Entertainment',
            author: 'Coolkyousinnjya',
            story: "Miss Kobayashi's Dragon Maid is a delightful, ongoing comedy manga series about a young lady who, after saving a dragon's life, finds herself the object of its indebtedness and undying affection. Featuring a cast of colourful supernatural characters, Miss Kobayashi's Dragon Maid is the perfect book for fans of Monster Musume and Merman in my Tub. Miss Kobayashi's Dragon Maid will be released as single-volume books, each including a full-colour insert. Miss Kobayashi is your average office worker who lives alone in her small apartment-until a young and adorable dragon girl named Tooru appears before her. Upon saving Tooru's life, the fiesty dragon will do anything to pay off her debt of gratitude, including insisting that she move in with Miss Kobayashi and serve her in any way she does or doesn't desire. Now Miss Kobayashi finds herself with a new, imposing roommate, who is doing her best to help out around the home. But when you're a dragon, nothing is ever simple. Kobayashi's normal life just went off the deep end.",
        },
        {   
            bookid: 'M05',
            image: "./bookimages/dr_stone_volume_1.jpg",
            bookname: "Dr.stone vol. 1",
            category: ['English','Action','Science','Comedy'],
            type: 'Manga',
            publisher: 'VIZ Media LLC',
            author: 'Riichiro Inagaki',
            story: "One fateful day, all of humanity was petrified by a blinding flash of light. After several millennia, high-schooler Taiju awakens and finds himself lost in a world of statues. However, he’s not alone! His science-loving friend Senku’s been up and running for a few months and he's got a grand plan in mind—to kickstart civilization with the power of science!",
        },
        {   
            bookid: 'M06',
            image: "./bookimages/spy_x_family_volume_1.jpg",
            bookname: "Spy x family vol. 1",
            category: ['English','Action','Comedy'],
            type: 'Manga',
            publisher: 'VIZ Media LLC',
            author: 'Tatsuya Endo',
            story: "Master spy Twilight is unparalleled when it comes to going undercover on dangerous missions for the betterment of the world. But when he receives the ultimate assignment—to get married and have a kid—he may finally be in over his head!",
        },
        {   
            bookid: 'MILF07',
            image: "./image/kmutt_library.jpg",
            bookname: "example book7",
            category: ['anime','action','horror'],
            type: 'manga',
            publisher: 'tokyo writer',
            author: 'kobayashi tohru',
            story: 'keep it simple',
        },
    ]

    return (
        <>
            <div className="flex h-[60vh] w-full left-0 top-0">
                <div className="bg-fixed bg-library bg-cover top-0 left-0 h-full w-full"></div>
            </div>
            <div className='top-[60vh] w-full min-h-[7vh] bg-white'>
                <div className='flex flex-row'>
                    <h1 className='font-bold font-poppins text-[#454545] text-3xl mt-[4rem] ml-36'>Recommendation</h1>
                    <h1 className='font-regular font-kanit text-[#797979] text-2xl mt-[4.2rem] ml-4'>หนังสือยอดนิยม</h1>                   
                </div>
                <div className="w-full h-[800px] bg-whitebrown m-auto mt-[2.5rem] drop-shadow-brown pt-16 pl-24 pr-24">
                <AliceCarousel 
                    mouseTracking
                    disableButtonsControls
                    autoWidth
                    disableDotsControls
                    responsive={responsive}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                    items={
                   bookdata.map((data) => (
                            <Book 
                            key={data.bookid}
                            image={data.image} 
                            bookname={data.bookname}
                            onClick={() => handleBookClick(data)}
                            />
                        ))} 
                />

                </div>
            </div>                
            {selectedBook && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40">
                        <Bookpopup 
                            book={selectedBook} 
                            onClose={() => handleBookClick(null)}
                            open={selectedBook !== null}
                        />
                    </div>
                    )}
        </>
    )
    

}