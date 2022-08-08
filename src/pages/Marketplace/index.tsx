import { Box, Container } from "@mui/material";
import { useState } from "react";
import { TSortBy, TViewMethod } from "../../utils/types";
import FilterSection from "./FilterSection";
import GridView from "./GridView";
import HeroSection from "./HeroSection";

export default function Marketplace() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [sortBy, setSortBy] = useState<TSortBy>('date-asc')
  const [viewMethod, setViewMethod] = useState<TViewMethod>('grid')

  const handleSearchKeyword = (value: string) => {
    setSearchKeyword(value)
  }

  const handleSortBy = (value: TSortBy) => {
    setSortBy(value)
  }

  const handleViewMethod = (value: TViewMethod) => {
    setViewMethod(value)
  }

  return (
    <Box>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 6, pb: 6 }}>
        <FilterSection
          searchKeyword={searchKeyword}
          handleSearchKeyword={handleSearchKeyword}
          sortBy={sortBy}
          handleSortBy={handleSortBy}
          viewMethod={viewMethod}
          handleViewMethod={handleViewMethod}
        />
        {
          viewMethod === 'grid' && (<GridView sx={{ mt: 5 }} />)
        }
      </Container>
    </Box>
  )
}