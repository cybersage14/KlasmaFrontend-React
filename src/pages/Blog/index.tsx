import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { TSortBy, TViewMethod } from "../../utils/types";
import FilterSection from "./FilterSection";
import HeroSection from "./HeroSectiont";
import GridView from "./GridView";
import usePost from "../../hooks/usePost";

export default function Blog() {
  const { posts, getAllPostsAct } = usePost()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [sortBy, setSortBy] = useState<TSortBy>('date-asc')
  const [viewMethod, setViewMethod] = useState<TViewMethod>('grid')

  useEffect(() => {
    getAllPostsAct()
  }, [])

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
        {/* <FilterSection
          searchKeyword={searchKeyword}
          handleSearchKeyword={handleSearchKeyword}
          sortBy={sortBy}
          handleSortBy={handleSortBy}
          viewMethod={viewMethod}
          handleViewMethod={handleViewMethod}
        /> */}
        {
          viewMethod === 'grid' && (<GridView sx={{ mt: 5 }} posts={posts} />)
        }
      </Container>
    </Box>
  )
}