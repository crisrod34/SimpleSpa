import React, { useEffect, useState } from 'react';
import GetTicketButton from '../buttons/GetTicketButton';
import CalculatePriceButton from '../buttons/CalculatePriceButton';
import GetTicketStateButton from '../buttons/GetTicketStateButton';
import SpaCapacityButton from '../buttons/SpaCapacityButton';
import { Grid, Typography } from '@mui/material';

const customers = new Map(JSON.parse(localStorage.getItem('customers')));
var _activeCustomerCount = localStorage.getItem('activeCustomerCount');

export default function Functions() {

    const [activeCustomerCount, setActiveCustomerCount] = useState(_activeCustomerCount);
    const [message, setMessage] = useState("");

    const submitCalculatePrice = (barcode) => {
        return calculatePrice(barcode);
    }

    const submitPaymentChoice = (barcode, paymentMethod) => {
        payTicket(barcode, paymentMethod);
    }

    const submitGetTicketState = (barcode) => {
        return getTicketState(barcode);
    }
    
    // Begin Business logic //////////////////////////////////////////////////////////

    const getTicket = () => {
        if (activeCustomerCount >= 60) {
            console.log("Sorry, the spa is currently full");
            setMessage("Sorry, the spa is currently full");
            return null;
        }
        let newTicket = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        customers.set(newTicket, {
            entryTime: Date.now(),
            ticketStatus: "unpaid",
            timePaid: null,
            paymentMethod: null
        });
        _activeCustomerCount++;
        setActiveCustomerCount(_activeCustomerCount);
        setMessage("Your barcode is: " + newTicket);
        localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
        localStorage.setItem('activeCustomerCount', _activeCustomerCount);
        return newTicket;
    }

    const calculatePrice = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);

        if (customer) {
            if (customer["ticketStatus"] == "paid") {
                setMessage("Ticket already paid");
                return 0;
            } else {
                let totalTime = (((Date.now() - customer["entryTime"]) / 1000) / 60) / 60;

                if (totalTime <= 3) {
                    console.log("Payment: $30");
                    setMessage("Payment: $30");
                    return 30;
                } else {
                    let remainder = Math.ceil(totalTime - 3);
                    console.log("Payment: $" + (30 + (remainder * 3)).toString());
                    setMessage("Payment: $" + (30 + (remainder * 3)).toString());
                    return 30 + (remainder * 3);
                }
            }
        } else {
            console.log("Barcode Invalid");
            setMessage("Barcode Invalid");
            return -1;
        }
    }

    const payTicket = (barcode, paymentMethod) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);
        if (customer["ticketStatus"] == "paid") {
            console.log("Ticket already paid");
            setMessage("Ticket already paid")
            return "Ticket already paid for";
        } else {
            localStorage.setItem('activeCustomerCount', activeCustomerCount);
            customer["ticketStatus"] = "paid";
            customer["paymentMethod"] = paymentMethod;
            customer["timePaid"] = Date.now();
            customers.set(barcode, customer);
            localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
            // For the scope of this project, consider that when someone pays, they immediately exit
            _activeCustomerCount--;
            setActiveCustomerCount(_activeCustomerCount);
            localStorage.setItem('activeCustomerCount', _activeCustomerCount);
            setMessage("Ticket " + barcode + " paid successfully");
            return "Ticket " + barcode + " paid successfully";
        }

    }

    const getTicketState = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);
        console.log(customer);
        if (customer) {
            console.log(customer["ticketStatus"]);
            setMessage("Ticket " + barcode + " is: " + customer["ticketStatus"]);
            return customer["ticketStatus"];
        } else {
            console.log("Barcode Invalid");
            setMessage("Barcode Invalid");
            return null
        }
    }

    const getFreeSpaces = () => {
        return 60 - activeCustomerCount;
    }

    ////////////////////////////////////////////////////////////////////////////

    // Enabling developer console execution
    useEffect(() =>  {
        window.getTicket = getTicket;
        window.calculatePrice = calculatePrice;
        window.payTicket = payTicket;
        window.getTicketState = getTicketState;
        window.getFreeSpaces = getFreeSpaces;
    })


    return (
        <main>
            <Typography 
                align="center"
                variant="h4"
                sx={{
                    pb: "1rem"
                }}>
                {message}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <GetTicketButton 
                        getTicket={() => {
                            getTicket();
                    }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CalculatePriceButton
                        submitCalculatePrice={submitCalculatePrice}
                        submitPaymentChoice={submitPaymentChoice}
                    />
                </Grid>
                <Grid item xs={3}>
                    <GetTicketStateButton 
                        submitGetTicketState={submitGetTicketState}
                    />
                </Grid>
                <Grid item xs={3}>
                    <SpaCapacityButton capacity={60 - activeCustomerCount}/>
                </Grid>
            </Grid>
        </main>
    );

};