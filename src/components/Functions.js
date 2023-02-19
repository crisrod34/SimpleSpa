import React, { Component } from 'react';
import GetTicketButton from '../buttons/GetTicketButton';
import { 
    Grid }
    from '@mui/material';

const BarcodeEntryTime = new Map(JSON.parse(localStorage.getItem('BarcodeEntryTime')));

class Functions extends Component {

    getTicket = () => {
        let barcode = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
        BarcodeEntryTime.set(barcode, Date.now());
        console.log(BarcodeEntryTime.entries());
        localStorage.setItem('BarcodeEntryTime', JSON.stringify(Array.from(BarcodeEntryTime.entries())));
        return barcode
    }

    componentDidMount() {
        window.getTicket = this.getTicket;
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
          </Grid>
        );
    }
};

export default Functions;