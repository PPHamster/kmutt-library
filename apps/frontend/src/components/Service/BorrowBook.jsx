import React , { useState } from 'react';
import Book from '@/components/Book';
import Bookpopup from '@/components/Bookoverlay';

export default function Borrowbook() {

    const [selectedBook, setSelectedBook] = useState(null)
    const handleBookClick = (book) => {
        setSelectedBook(book);
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('do validate')
        }
    }

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
            bookid: 'M07',
            image: "./bookimages/onimai_i'm_now_your_sister_volume_1.jpg",
            bookname: "Onimai I'm now your sister vol. 1",
            category: ['English','Comedy','Slice of life'],
            type: 'Manga',
            publisher: 'Kodansha Comics',
            author: 'Nekotofu',
            story: "Mahiro Oyama was just a normal erotic-game loving dude... until he woke up one morning as a woman! Turns out his mad-scientist little sister, Mihari, tried out one of her new experiments on him... with a disastrous outcome, as far as Mahiro's concerned! But Mihari is as determined to study him as he is determined to go back to his shut-in, game-playing life, and one thing's for sure... life is going to get a whole lot weirder from here on out!",
        },
        {   
            bookid: 'M08',
            image: "./bookimages/bocchi_the_rock_volume_1.jpg",
            bookname: "Bocchi the rock vol. 1",
            category: ['Japanese','Comedy','Slice of life','Music'],
            type: 'Manga',
            publisher: 'Houbunsha',
            author: 'Aki Hamaji',
            story: "Goto Hitori, aka 'Bokuchi-chan' is a lonely girl who loves to play the guitar. She spends her days playing alone at home, but by chance, she joins the 'Band of Unity' led by Nijika Ijichi. Goto is not used to performing in front of others, but can she become a great band member? This is the hottest music manga for all the chubby boys and girls in Japan right now!",
        },
    ]

    return (
        <>  
            <div className='relative flex flex-row min-h-[7vh] mb-64 top-[150px]'>
                <div className='w-[22.2vw] flex flex-col'>

                </div>
                <div className='flex flex-col'>
                    <div>
                        <div class='max-w-lg ml-[70px]'>
                            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2">
                                <div class="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.." /> 
                            </div>
                        </div>
                    </div>
                    <div className='w-full min-h-[7vh] left-0 bg-white mt-4'>
                        <div className='w-[80vw] h-[70vh] grid gap-4 grid-auto-fit-[17rem] overflow-y-scroll overflow-x-hidden p-12'>
                                {bookdata.map((data) => (
                                    <Book 
                                    key={data.bookid}
                                    image={data.image} 
                                    bookname={data.bookname}
                                    onClick={() => handleBookClick(data)}
                                />))}
                        </div>
                    </div>                       
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