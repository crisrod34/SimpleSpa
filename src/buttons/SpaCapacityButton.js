import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Stack, Typography } from '@mui/material';

export default function SpaCapacityButton({capacity}) {
    return (
        <Button 
            disableRipple
            sx={{width: "-webkit-fill-available"}} 
            size="large" 
            variant="outlined"
            color="inherit">
            <Stack direction="column" alignItems="center" justifyContent={"center"}>
                <GroupsIcon />
                <Typography>Spa Capacity: {capacity}</Typography>
            </Stack>
        </Button>
    )
}