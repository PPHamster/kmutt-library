import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/Dashboard/Title';
import { fetch } from '@/utils/Fetch';

function preventDefault(event) {
  event.preventDefault();
}

export default function Books() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/dashboard/books/latest?count=${7}`)
      setData(response.data);
    }

    fetchData();
  }, []);

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
          {data.map((row) => (
            <TableRow key={row.id}>
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
