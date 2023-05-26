import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/Dashboard/Title';

// Generate Order Data
  const data = [
    {
      id: 1,
      date: '2023-04-11',
      name:'jone del',
      isReturned: 1,
      OrderId: 123,
      Amount: 1,
    }
  ]


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Returned</TableCell>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Book Amount (เล่ม)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.isReturned == 1 ? 'yes' : 'no'}</TableCell>
              <TableCell>{row.OrderId}</TableCell>
              <TableCell align="right">{row.Amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}