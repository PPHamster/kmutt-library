import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function OrderSummary({ cartItem, user }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Product
      </Typography>
      <List disablePadding>
        {cartItem.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.author} />
            {
              product.isReady ?
                <Typography variant="body2" sx={{ color: 'green' }}> ready </Typography>
                : <Typography variant="body2" sx={{ color: '#d17804' }}> unready </Typography>
            }
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <p className="font-kanit font-medium text-lg text-gray-500">
            {cartItem.length} เล่ม
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
          <Typography gutterBottom>{'Phone number : ' + user.tel}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
