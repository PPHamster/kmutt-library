import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '@/components/Dashboard/Title';

const data = [
  {
    createdAt: '2023-02-11T23:00:00Z',
    Amount : 8,
  },
  {
    createdAt: '2023-02-11T23:00:00Z',
    Amount : 4,
  },
  {
    createdAt: '2023-01-11T23:00:00Z',
    Amount : 7,
  },
  {
    createdAt: '2023-04-11T23:00:00Z',
    Amount : 3,
  },
]




export default function Chart() {
  const theme = useTheme();
  
  const timedata = data.map((item) => {return{ createdAt: item.createdAt.split('T')[0], Amount: item.Amount}}).splice(0, 10).sort(function(a, b) {return b.Amount - a.Amount});
  
  return (
    <React.Fragment>
      <Title>Most order in a day</Title>
      <ResponsiveContainer>
        <LineChart
          data={timedata}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="createdAt"
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
            dataKey="Amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}