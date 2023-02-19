import React, { Component, useState } from 'react';
import GetTicketButton from '../buttons/GetTicketButton';
import CalculatePriceButton from '../buttons/CalculatePriceButton';
import GetTicketStateButton from '../buttons/GetTicketStateButton';
import SpaCapacityButton from '../buttons/SpaCapacityButton';
import { Grid } from '@mui/material';

const customers = new Map(JSON.parse(localStorage.getItem('customers')));
var activeCustomerCount = localStorage.getItem('activeCustomerCount');

class Functions extends Component {

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

    submitGetTicketState = (barcode) => {
        return this.getTicketState(barcode);
    }
    
    // Business logic
    getTicket = () => {
        if (activeCustomerCount >= 60) {
            console.log("Sorry, the spa is currently full");
            return null;
        }
        let newTicket = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        customers.set(newTicket, {
            entryTime: Date.now(),
            ticketStatus: "unpaid",
            timePaid: null,
            paymentMethod: null
        });
        console.log(customers);
        localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
        activeCustomerCount++;
        localStorage.setItem('activeCustomerCount', activeCustomerCount);
        return newTicket;
    }

    calculatePrice = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);

        if (customer) {
            if (customer["ticketStatus"] == "paid") {
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
        if (customer["ticketStatus"] == "paid") {
            console.log("Ticket already paid for");
            return "Ticket already paid for";
        } else {
            customer["ticketStatus"] = "paid";
            customer["paymentMethod"] = paymentMethod;
            customer["timePaid"] = Date.now();
            customers.set(barcode, customer);
            localStorage.setItem('customers', JSON.stringify(Array.from(customers.entries())));
            // For the scope of this project, consider that when someone pays, they immediately exit
            --activeCustomerCount;
            localStorage.setItem('activeCustomerCount', activeCustomerCount);
            return "Ticket " + barcode + " paid successfully";
        }

    }

    getTicketState = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        let customer = customers.get(barcode);
        console.log(customer);
        if (customer) {
            console.log(customer["ticketStatus"]);
            return customer["ticketStatus"];
        } else {
            return null
        }
    }

    getFreeSpaces = () => {
        return 60 - activeCustomerCount;
    }

    // Enabling developer console execution
    componentDidMount() {
        window.getTicket = this.getTicket;
        window.calculatePrice = this.calculatePrice;
        window.payTicket = this.payTicket;
        window.getTicketState = this.getTicketState;
        window.getFreeSpaces = this.getFreeSpaces;
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
                    submitCalculatePrice={this.submitCalculatePrice}
                    submitPaymentChoice={this.submitPaymentChoice}
                />
            </Grid>
            <Grid item xs={3}>
                <GetTicketStateButton 
                    submitGetTicketState={this.submitGetTicketState}
                />
            </Grid>
            <Grid item xs={3}>
                <SpaCapacityButton capacity={60 - activeCustomerCount}/>
            </Grid>
          </Grid>
        );
    }
};

export default Functions;