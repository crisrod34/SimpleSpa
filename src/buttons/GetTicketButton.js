import { Button } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function GetTicketButton(props) {
    return (
        <Button 
            sx={{width: "-webkit-fill-available"}} 
            startIcon={<ConfirmationNumberIcon />} 
            size="large" 
            variant="contained"
            onClick={props.getTicket}>
            Get Ticket
        </Button>
    )
}