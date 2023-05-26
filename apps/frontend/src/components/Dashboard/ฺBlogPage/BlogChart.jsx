import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, Tooltip, XAxis, Legend, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '@/components/Dashboard/Title';

// Generate Sales Data
const data = [
    {
      name: 'Chainsawman, vol. 1',
      BlogCount: 20,
    },
    {
      name: 'Chainsawman, vol. 2',
      BlogCount: 12,
    },
    {
      name: 'Chainsawman, vol. 3',
      BlogCount: 23,
    },
    {
      name: 'Chainsawman, vol. 4',
      BlogCount: 45,
    },
    {
      name: 'Chainsawman, vol. 5',
      BlogCount: 34,
    },
  ];

// get data 0 - 10
const chartbook = data.slice(0, 10).sort(function(a, b) {return b.BookCount - a.BookCount});

export default function Chartbook() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Most books in blog</Title>
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
            dataKey="name"
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
          <Bar dataKey="BlogCount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}