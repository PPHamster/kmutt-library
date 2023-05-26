import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, Tooltip, XAxis, Legend, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '@/components/Dashboard/Title';

// Generate Sales Data
const data = [
  {
    title: 'Chainsawman, vol. 1',
    BookCount: 20,
  },
  {
    title: 'Chainsawman, vol. 2',
    BookCount: 12,
  },
  {
    title: 'Chainsawman, vol. 3',
    BookCount: 23,
  },
  {
    title: 'Chainsawman, vol. 4',
    BookCount: 45,
  },
  {
    title: 'Chainsawman, vol. 5',
    BookCount: 34,
  },
];

// get data 0 - 10
const chartbook = data.slice(0, 10).sort(function(a, b) {return b.BookCount - a.BookCount});

export default function Chartbook() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Most order books</Title>
      <ResponsiveContainer>
        <BarChart
          data={chartbook}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="title"
            type='category'
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
          <Tooltip />
          <Legend />
          <Bar dataKey="BookCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}