import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '@/components/Dashboard/Title';
import { fetch } from '@/utils/Fetch';

export default function Chart() {
  const theme = useTheme();

  const [data, setData] = React.useState([]);

  const dataMap = data.map((item) => {
    return { hour: `${item.hour}:00 - ${item.hour}:59`, count: item.count }
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch.get('/dashboard/orders/hour-count');
      setData(response.data);
    }

    fetchData();
  }, []);
  
  return (
    <React.Fragment>
      <Title>Most order in a day</Title>
      <ResponsiveContainer>
        <LineChart
          data={dataMap}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="hour"
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
              Amount
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
