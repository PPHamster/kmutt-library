import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Orderlist from './OrderList';
import Review from './Review';
import OrderSummary from './Summary';
import NavbarStatic from '../navbarStatic';
import { WithUser } from '@/components/Hoc/WithUser';
import { fetch } from '@/utils/Fetch';
import { popup } from '@/utils/Popup';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const steps = ['cart item list', 'customer details', 'Review your order'];

const theme = createTheme();
export default WithUser(function Checkout() {
  const { user } = useAuth();
  const { cart, setCart, deleteCart } = useCart();
  const [activeStep, setActiveStep] = React.useState(0);
  const [order, setOrder] = React.useState(null);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Orderlist cartItem={cart} deleteCart={deleteCart} />;
      case 1:
        return <Review cartItem={cart} user={user} />;
      case 2:
        return <OrderSummary cartItem={cart} user={user} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {
    // place order
    if (activeStep + 1 === steps.length) {
      try {
        await fetch.post('/orders');
        const response = await fetch.get('/orders');
        setOrder(response.data[response.data.length - 1]);
        setCart([]);
        setActiveStep(activeStep + 1);
      } catch (error) {
        await popup.fire({
          icon: 'error',
          title: 'Failed to place order!',
          text: `${error.response.data.message}`,
        })
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!cart) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavbarStatic
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
        <div className='mt-36'></div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavbarStatic
        bgcolor='bg-white hover:drop-shadow-md'
        textcolor='text-black'
      />
      <div className='mt-36'></div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>

              {/* text after confirmation order */}

              <Typography variant="subtitle1">
                {`Your order number is ${order?.id} We have emailed your order
                confirmation, and will send you an update when your order has
                ready to pick up.`}
              </Typography>
              <div className="flex justify-center items-center my-10">
                <Link to="/">
                  <Button variant="contained" className="mx-auto">Back To Home Page</Button>
                </Link>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
})
