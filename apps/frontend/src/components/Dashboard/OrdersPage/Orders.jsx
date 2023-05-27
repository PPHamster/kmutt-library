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

export default function Orders() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/dashboard/orders/latest?count=${7}`);
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>User Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Book Amount (เล่ม)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{new Date(row.createdAt).toLocaleDateString({ timeZone: 'Asia/Bangkok' })}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.firstname + ' ' + row.lastname}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
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
