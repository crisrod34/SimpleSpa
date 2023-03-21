import { Button, Stack, Typography } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function GetTicketButton(props) {
	return (
		<Button
			sx={{ width: '-webkit-fill-available' }}
			size="large"
			variant="outlined"
			color="inherit"
			onClick={props.getTicket}
		>
			<Stack direction="column" alignItems="center" justifyContent={'center'}>
				<ConfirmationNumberIcon />
				<Typography>Get Ticket</Typography>
			</Stack>
		</Button>
	);
}
