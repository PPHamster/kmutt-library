import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, Tooltip, XAxis, Legend, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '@/components/Dashboard/Title';
import { fetch } from '@/utils/Fetch';

export default function Eventchart() {
  const theme = useTheme();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get(`/dashboard/events/${6}`)
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Most event that people attending</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Guest
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#996666" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
