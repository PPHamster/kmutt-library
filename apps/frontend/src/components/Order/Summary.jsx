import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const Cartitem = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    isReady: 0,
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    isReady: 1,
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    isReady: 1,
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    isReady: 0,
  },
];

const user = {
    firstname: 'John',
    lastname: 'Smith',
    email: 'john@support.kmutt.com',
    tel: '5555555555',
};
export default function OrderSummary() {
  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
            Order Product
        </Typography>
        <List disablePadding>
            {Cartitem.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.desc} />
                {  
                   product.isReady ?
                  <Typography variant="body2" sx={{color: 'green' }}> ready </Typography>
                  : <Typography variant="body2" sx={{color: '#d17804'}}> unready </Typography>
                
                }
            </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <p className="font-kanit font-medium text-lg text-gray-500">
                            {Cartitem.length} เล่ม
                        </p>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Customer Details
            </Typography>
            <Typography gutterBottom>{user.firstname + ' ' + user.lastname}</Typography>
            <Typography gutterBottom>{user.email}</Typography>
            <Typography gutterBottom>{'Phone number ' + user.tel}</Typography>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}