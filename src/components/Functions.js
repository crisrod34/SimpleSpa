import React, { Component } from 'react';
import GetTicketButton from '../buttons/GetTicketButton';
import CalculatePriceButton from '../buttons/CalculatePriceButton';
import { 
    Grid }
    from '@mui/material';

const BarcodeEntryTime = new Map(JSON.parse(localStorage.getItem('BarcodeEntryTime')));

class Functions extends Component {

    barcode = "";

    // Utility
    childToParent = (childData) => {
        barcode = childData;
    }

    submitCalculatePrice = (barcode) => {
        this.calculatePrice(barcode);
    }
    
    // Business logic
    getTicket = () => {
        let barcode = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        BarcodeEntryTime.set(barcode, Date.now());
        console.log(BarcodeEntryTime.entries());
        localStorage.setItem('BarcodeEntryTime', JSON.stringify(Array.from(BarcodeEntryTime.entries())));
        return barcode
    }

    calculatePrice = (barcode) => {
        // Allow for easy input from console
        if (typeof barcode == 'number' || barcode instanceof Number) {
            barcode = barcode.toString();
        }

        if (BarcodeEntryTime.get(barcode)) {
            let totalTime = (((Date.now() - BarcodeEntryTime.get(barcode)) / 1000) / 60) / 60;

            if (totalTime <= 3) {
                console.log("Payment: $30")
                return 30
            } else {
                let remainder = Math.ceil(totalTime - 3);
                console.log("Payment: $" + (30 + (remainder * 3)).toString());
                return 30 + (remainder * 3);
            }
        } else {
            console.log("Barcode Invalid");
            return null;
        }

    }

    componentDidMount() {
        window.getTicket = this.getTicket;
        window.calculatePrice = this.calculatePrice;
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
                />
            </Grid>
          </Grid>
        );
    }
};

export default Functions;