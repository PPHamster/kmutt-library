import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '@/components/Dashboard/Title';
import { fetch } from '@/utils/Fetch';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/dashboard/blogs`)
      setData(response.data);
    }

    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Title>All Blogs</Title>
      <Typography component="p" variant="h4">
        {data.length + "  Blogs"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date().toLocaleDateString({ timeZone: 'Asia/Bangkok' })}
      </Typography>
    </React.Fragment>
  );
}
