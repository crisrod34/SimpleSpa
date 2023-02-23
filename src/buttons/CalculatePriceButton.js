import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

export default function GetTicketButton({submitCalculatePrice, submitPaymentChoice}) {

    const [barcode, setBarcode] = useState("");

    const [state, setState] = useState("button");

    const handleChange = (e) => {
        setBarcode(e.target.value);
    };
    
    const handleSubmit = () => {
        if (submitCalculatePrice(barcode) != null) {
            setState("choose-payment-method");
        }
    };

    const handleEnter = (e) => {
        if(e.keyCode == 13){
            e.preventDefault();
            handleSubmit();
        }
    };

    const handlePaymentChoice = (paymentMethod) => {
        submitPaymentChoice(barcode, paymentMethod);
        setState("button");
    }

    return (
        <main>
            {state == "button" && (
                <Button 
                    sx={{width: "-webkit-fill-available"}} 
                    size="large" 
                    variant="outlined"
                    color="inherit"
                    onClick={() => {setState("enter-barcode")}}>
                    <Stack direction="column" alignItems="center" justifyContent={"center"}>
                        <PriceCheckIcon />
                        <Typography>Begin Payment</Typography>
                    </Stack>
                </Button>
            )}
            {state == "enter-barcode" && (
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    maxWidth={'100%'}>
                    <TextField
                        required
                        label="Enter Barcode Here"
                        placeholder="16 Digit Barcode"
                        variant="outlined"
                        fullWidth
                        size="large"
                        onKeyDown={handleEnter}
                        onChange={handleChange}>
                    </TextField>
                    <Button 
                        sx={{width: "-webkit-fill-available"}} 
                        size="large" 
                        variant="outlined"
                        color="inherit"
                        onClick={() => {handleSubmit()}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <Typography>Submit</Typography>
                        </Stack>
                    </Button>  
                    <Button 
                        sx={{
                            width: "-webkit-fill-available",
                        }}
                        color="error"
                        size="large" 
                        variant="contained"
                        onClick={() => {setState("button")}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <CancelIcon />
                            <Typography>Cancel</Typography>
                        </Stack>
                    </Button>  
                </Stack>
            )}
            {state == "choose-payment-method" && (
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    maxWidth={'100%'}>
                    <Button 
                        sx={{
                            width: "-webkit-fill-available",
                        }}
                        color="inherit"
                        size="large" 
                        variant="outlined"
                        onClick={() => {handlePaymentChoice("credit_card")}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <CreditCardIcon />
                            <Typography>Credit Card</Typography>
                        </Stack>
                    </Button> 
                    <Button 
                        sx={{
                            width: "-webkit-fill-available",
                        }}
                        color="inherit"
                        size="large" 
                        variant="outlined"
                        onClick={() => {handlePaymentChoice("debit_card")}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <CreditCardIcon />
                            <Typography>Debit Card</Typography>
                        </Stack>
                    </Button>
                    <Button 
                        sx={{
                            width: "-webkit-fill-available",
                        }}
                        color="inherit"
                        size="large" 
                        variant="outlined"
                        onClick={() => {handlePaymentChoice("cash")}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <LocalAtmIcon />
                            <Typography>Cash</Typography>
                        </Stack>
                    </Button>
                    <Button 
                        sx={{
                            width: "-webkit-fill-available",
                        }}
                        color="error"
                        size="large" 
                        variant="contained"
                        onClick={() => {setState("button")}}>
                        <Stack direction="column" alignItems="center" justifyContent={"center"}>
                            <CancelIcon />
                            <Typography>Cancel</Typography>
                        </Stack>
                    </Button>  
                </Stack>
            )}
        </main>
    )
}