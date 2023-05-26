import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '@/components/Dashboard/Title';

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


export default function Allorder() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Typography component="p" variant="h4">
        {data.length + " orders"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date().toISOString().split('T')[0]}
      </Typography>
    </React.Fragment>
  );
}