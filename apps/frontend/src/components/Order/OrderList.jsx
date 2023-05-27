import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetch } from '@/utils/Fetch';
import axios from 'axios';

export default function Orderlist({ cartItem, deleteCart }) {

  const deleteItem = async (bookId) => {
    const result = await deleteCart(bookId);
    if (axios.isAxiosError(result)) {
      await popup.fire({
        icon: 'error',
        title: 'Failed to delete from cart!',
        text: `${result.response.data.message}`,
      })
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Product
      </Typography>
      <List disablePadding>
        {cartItem.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 1 }}>
            {/* detail of order item*/}
            <ListItemText primary={product.title} secondary={product.author} />
            <IconButton onClick={() => { deleteItem(product.id) }} aria-label="delete" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
        <div className="my-4"></div>
        <ListItem sx={{ py: 1, px: 1 }}>
          <ListItemText primary="Total" />
          <p className="font-kanit font-medium text-lg text-gray-500">
            {/* total order item */}
            {cartItem.length} เล่ม
          </p>
        </ListItem>
      </List>
    </>
  )
}
