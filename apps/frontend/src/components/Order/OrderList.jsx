import React from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

export default function Orderlist() {

    const Cartitem = [
        {
          title: 'Product 1',
          author: 'A nice thing',
          
        },
        {
          title: 'Product 2',
          author: 'Another thing',
        },
        {
          title: 'Product 3',
          author: 'Something else',
        },
        {
          title: 'Product 4',
          author: 'Best thing of all',
        },
      ];

    return (
        <>
        <Typography variant="h6" gutterBottom>
        Order Product
        </Typography>
            <List disablePadding>
                {Cartitem.map((product) => (
                    <ListItem key={product.title} sx={{ py: 1, px: 1 }}>
                      {/* detail of order item*/}
                        <ListItemText primary={product.title} secondary={product.author} />
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                ))}
                <div className="my-4"></div>
                <ListItem sx={{ py: 1, px: 1 }}>
                    <ListItemText primary="Total" />
                    <p className="font-kanit font-medium text-lg text-gray-500">
                      {/* total order item */}
                        {Cartitem.length} เล่ม
                    </p>
                </ListItem>
            </List>
        </>
    )
}