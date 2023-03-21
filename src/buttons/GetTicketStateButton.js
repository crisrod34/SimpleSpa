import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel';

export default function GetTicketButton({ submitGetTicketState }) {
	const [barcode, setBarcode] = useState('');

	const [state, setState] = useState('button');

	const handleChange = (e) => {
		setBarcode(e.target.value);
	};

	const handleSubmit = () => {
		if (submitGetTicketState(barcode) != null) {
			setState('button');
		}
	};

	const handleEnter = (e) => {
		if (e.keyCode == 13) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<main>
			{state == 'button' && (
				<Button
					sx={{ width: '-webkit-fill-available' }}
					size="large"
					variant="outlined"
					color="inherit"
					onClick={() => {
						setState('enter-barcode');
					}}
				>
					<Stack direction="column" alignItems="center" justifyContent={'center'}>
						<HelpIcon />
						<Typography>Get Ticket State</Typography>
					</Stack>
				</Button>
			)}
			{state == 'enter-barcode' && (
				<Stack direction="column" spacing={2} justifyContent="center" maxWidth={'100%'}>
					<TextField
						required
						label="Enter Barcode Here"
						placeholder="16 Digit Barcode"
						variant="outlined"
						fullWidth
						onKeyDown={handleEnter}
						onChange={handleChange}
					></TextField>
					<Button
						sx={{ width: '-webkit-fill-available' }}
						size="large"
						variant="outlined"
						color="inherit"
						onClick={() => {
							handleSubmit();
						}}
					>
						<Stack direction="column" alignItems="center" justifyContent={'center'}>
							<Typography>Submit</Typography>
						</Stack>
					</Button>
					<Button
						sx={{
							width: '-webkit-fill-available',
						}}
						color="error"
						size="large"
						variant="contained"
						onClick={() => {
							setState('button');
						}}
					>
						<Stack direction="column" alignItems="center" justifyContent={'center'}>
							<CancelIcon />
							<Typography>Cancel</Typography>
						</Stack>
					</Button>
				</Stack>
			)}
		</main>
	);
}
