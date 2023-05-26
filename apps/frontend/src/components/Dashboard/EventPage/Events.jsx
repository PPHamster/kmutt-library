import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/Dashboard/Title';

/*CREATE TABLE `Event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `location` TEXT NOT NULL,
  `meetingTime` DATETIME NOT NULL,
  `endTime` DATETIME NOT NULL,
  `image` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  */
// Generate Order Data
  const data = [
    {
      id: 1,
      name:'jone del',
      location: '1st floor',
      meetingTime: '19:00',
      endTime: '20:00',
      iamge: "",
      description: "123",
    }
  ]


function preventDefault(event) {
  event.preventDefault();
}

export default function Events() {

  const eventdata = data.reverse();
  return (
    <React.Fragment>
      <Title>Recent Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>StartTime</TableCell>
            <TableCell>EndTime</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventdata.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.meetingTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
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