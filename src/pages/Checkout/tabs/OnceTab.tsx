import { Icon } from "@iconify/react";
import { Box, Button, Stack, TextField, Icon as MuiIcon } from "@mui/material";

const PRICES = [10, 20, 40, 50, 75, 100, 120, 150, 200, 250, 300]

interface IProps {
  price: number;
  handleSetPrice: Function;
}

export default function OnceTab({ price, handleSetPrice }: IProps) {

  return (
    <Box>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {
          PRICES.map(price => (
            <Button variant="outlined" key={price} onClick={() => handleSetPrice(String(price))}>
              ${price}
            </Button>
          ))
        }
      </Stack>
      <TextField
        value={price}
        onChange={e => handleSetPrice(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{
          startAdornment: <MuiIcon><Icon icon="bx:dollar" /></MuiIcon>
        }}
        fullWidth
      />
    </Box>
  )
}