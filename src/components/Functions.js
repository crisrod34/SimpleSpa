import React, { Component } from 'react';
import GetTicketButton from '../buttons/GetTicketButton';
import CalculatePriceButton from '../buttons/CalculatePriceButton';
import { 
    Grid }
    from '@mui/material';

const customers = new Map(JSON.parse(localStorage.getItem('customers')));

class Functions extends Component {

    barcode = "";

    // Utility
    childToParent = (childData) => {
        barcode = childData;
    }

    submitCalculatePrice = (barcode) => {
        return this.calculatePrice(barcode);
    }

    submitPaymentChoice = (barcode, paymentMethod) => {
        this.payTicket(barcode, paymentMethod);
    }
    
    // Business logic
    getTicket = () => {
        if (customers.size >= 60) {
            console.log("Sorry, the spa is currently full");
            return null;
        }
        let newTicket = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        customers.set(newTicket, {
            entryTime: Date.now(),
            ticketPaid: false,
            timePaid: null,
            paymentMethod: null
        });
        console.log(customers);
        localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
        return newTicket;
    }

    calculatePrice = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);

        if (customer) {
            if (customer["ticketPaid"]) {
                return 0;
            } else {
                let totalTime = (((Date.now() - customer["entryTime"]) / 1000) / 60) / 60;

                if (totalTime <= 3) {
                    console.log("Payment: $30")
                    return 30
                } else {
                    let remainder = Math.ceil(totalTime - 3);
                    console.log("Payment: $" + (30 + (remainder * 3)).toString());
                    return 30 + (remainder * 3);
                }
            }
        } else {
            console.log("Barcode Invalid");
            return null;
        }
    }

    payTicket = (barcode, paymentMethod) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);
        if (customer["ticketPaid"]) {
            return "Ticket already paid for"
        } else {
            customer["ticketPaid"] = true;
            customer["paymentMethod"] = paymentMethod;
            customer["timePaid"] = Date.now();
            customers.set(barcode, customer);
            localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
            return "Ticket " + barcode + " paid successfully";
        }

    }

    componentDidMount() {
        window.getTicket = this.getTicket;
        window.calculatePrice = this.calculatePrice;
        window.payTicket = this.payTicket;
    }

    render() {
        return (
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
                    childToParent={this.childToParent}
                    submitCalculatePrice={this.submitCalculatePrice}
                    submitPaymentChoice={this.submitPaymentChoice}
                />
            </Grid>
          </Grid>
        );
    }
};

export default Functions;