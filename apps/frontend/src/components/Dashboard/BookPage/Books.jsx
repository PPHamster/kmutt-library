import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/Dashboard/Title';

const bookdata = [
    {   
        bookid: 'M01',
        image: "./bookimages/chainsawman_volume_1.jpg",
        title : "Chainsawman, vol. 1",
        category: ['Action','Comedy'],
        type: 'Manga',
        publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
        publishDate: '2020-10-06',
        pages: '192',
        language: 'English',
        isbn: '9781974709939',
        author: 'Fujimoto, Tatsuki',
        description: "Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous—Chainsaw Man! Denji's a poor young man who'll do anything for money, even hunting down devils with his pet devil Pochita. He's a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he's betrayed by someone he trusts. Now with the power of a devil inside him, Denji's become a whole new man—Chainsaw Man!",
        location: 'Floor 2, bookshelf 4L'
    },
    {   
        bookid: 'M02',
        image: "./bookimages/kaguya_sama_love_is_war_volume_1.jpg",
        title : "Kaguya sama love is war, vol. 1",
        category: ['Comedy','Romance'],
        type: 'Manga',
        publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
        publishDate: '2018-03-06',
        pages: '216',
        language: 'English',
        isbn: '9781974700301',
        author: 'Akasaka, Aka',
        description: "All's fair when love is war! Two prideful geniuses locked in battle. Who will make the first misstep and in doing so...confess their love? Kaguya Shinomiya and Miyuki Shirogane are two geniuses who stand atop their prestigious academy's student council, making them the elite among elite. But it's lonely at the top and each has fallen for the other. There's just one huge problem standing in the way of lovey-dovey bliss—they're both too prideful to be the first to confess their romantic feelings and thus become the 'loser' in the competition of love! And so begins their daily schemes to force the other to confess first! A romantic comedy featuring the hilarious antics of geniuses in love.",
    },
    {   
        bookid: 'M03',
        image: "./bookimages/chainsawman_volume_5.jpg",
        title : "Chainsawman, vol. 5",
        category: ['Action','Comedy'],
        type: 'Manga',
        publisher: 'Viz Media, Subs. of Shogakukan Inc (US)',
        publishDate: '2021-06-01',
        pages: '200',
        language: 'English',
        isbn: '9781974719228',
        author: 'Fujimoto, Tatsuki',
        description: "Denji’s a poor young man who’ll do anything for money, even hunting down devils with his pet devil Pochita. He’s a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he’s betrayed by someone he trusts. Now with the power of a devil inside him, Denji’s become a whole new man—Chainsaw Man!",
    },
    {   
        bookid: 'M04',
        image: "./bookimages/Miss_Kobayashi's_Dragon_Maid_Volume_1.jpg",
        title : "Miss kobayashi's Dragon maid, vol. 1",
        category: ['Comedy','Slice of life'],
        type: 'Manga',
        publisher: 'Seven Seas Entertainment',
        publishDate: '2016-10-18',
        pages: '144',
        language: 'English',
        isbn: '9781626923485',
        author: 'Coolkyousinnjya',
        description: "Miss Kobayashi's Dragon Maid is a delightful, ongoing comedy manga series about a young lady who, after saving a dragon's life, finds herself the object of its indebtedness and undying affection. Featuring a cast of colourful supernatural characters, Miss Kobayashi's Dragon Maid is the perfect book for fans of Monster Musume and Merman in my Tub. Miss Kobayashi's Dragon Maid will be released as single-volume books, each including a full-colour insert. Miss Kobayashi is your average office worker who lives alone in her small apartment-until a young and adorable dragon girl named Tooru appears before her. Upon saving Tooru's life, the fiesty dragon will do anything to pay off her debt of gratitude, including insisting that she move in with Miss Kobayashi and serve her in any way she does or doesn't desire. Now Miss Kobayashi finds herself with a new, imposing roommate, who is doing her best to help out around the home. But when you're a dragon, nothing is ever simple. Kobayashi's normal life just went off the deep end.",
    },
    {   
        bookid: 'M05',
        image: "./bookimages/dr_stone_volume_1.jpg",
        title : "Dr.stone, vol. 1",
        category: ['Action','Science','Comedy'],
        type: 'Manga',
        publisher: 'VIZ Media LLC',
        publishDate: '2018-09-04',
        pages: '200',
        language: 'English',
        isbn: '9781974702619',  
        author: 'Riichiro Inagaki',
        description: "One fateful day, all of humanity was petrified by a blinding flash of light. After several millennia, high-schooler Taiju awakens and finds himself lost in a world of statues. However, he’s not alone! His science-loving friend Senku’s been up and running for a few months and he's got a grand plan in mind—to kickstart civilization with the power of science!",
    },
]

   

function preventDefault(event) {
  event.preventDefault();
}

export default function Books() { 
    
    const recentbook = bookdata.reverse()

  return (
    <React.Fragment>
      <Title>Recent Books</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Isbn Barcode</TableCell>
            <TableCell align="right">location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentbook.map((row) => (
            <TableRow key={row.bookid}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.publisher}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.isbn}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Books
      </Link>
    </React.Fragment>
  );
}