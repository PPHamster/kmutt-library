import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '@/components/Dashboard/Title';
import { fetch } from '@/utils/Fetch';

function preventDefault(event) {
  event.preventDefault();
}


export default function Allevent() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/dashboard/events/`)
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Typography component="p" variant="h4">
        {data.length + " events"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date().toLocaleDateString({ timeZone: 'Asia/Bangkok' })}
      </Typography>
    </React.Fragment>
  );
}
