import { Icon } from "@iconify/react";
import { Stack, TextField, useTheme, IconButton, MenuItem, ButtonGroup, Button } from "@mui/material";
import { TSortBy, TViewMethod } from "../../utils/types";

interface IProps {
  searchKeyword: string;
  handleSearchKeyword: Function;
  sortBy: TSortBy;
  handleSortBy: Function;
  viewMethod: TViewMethod;
  handleViewMethod: Function;
  sx?: object;
}

export default function FilterSection({
  handleSearchKeyword,
  searchKeyword,
  sortBy,
  handleSortBy,
  viewMethod,
  handleViewMethod,
  sx
}: IProps) {
  const theme = useTheme()
  return (
    <Stack
      sx={{ ...sx }}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          label="Search"
          placeholder="Input keyword"
          InputProps={{
            endAdornment: (
              <IconButton sx={{ color: theme.palette.primary.main }} disabled={!searchKeyword}>
                <Icon icon="fluent:search-12-filled" />
              </IconButton>
            )
          }}
          value={searchKeyword}
          onChange={(e) => handleSearchKeyword(e?.target?.value)}
        />

        <TextField
          select
          label="Sort by"
          onChange={(e) => handleSortBy(e?.target?.value)}
          value={sortBy}
        >
          <MenuItem value="date-asc">Date ASC</MenuItem>
          <MenuItem value="date-desc">Date DESC</MenuItem>
          <MenuItem value="title-asc">Title ASC</MenuItem>
          <MenuItem value="title-desc">Title DESC</MenuItem>
        </TextField>
      </Stack>

      <ButtonGroup variant="outlined" size="large">
        <Button
          variant={viewMethod === 'list' ? 'contained' : 'outlined'}
          onClick={() => handleViewMethod('list')}
        >
          <Icon icon="ant-design:unordered-list-outlined" />
        </Button>
        <Button
          variant={viewMethod === 'grid' ? 'contained' : 'outlined'}
          onClick={() => handleViewMethod('grid')}
        >
          <Icon icon="bi:grid-fill" />
        </Button>
      </ButtonGroup>
    </Stack>
  )
}