import { useEffect } from 'react';
import { Box } from "@mui/material";
import useCampaign from "../../hooks/useCampaign";
import Banner1Section from "./Banner1Section";
import Banner2Section from "./Banner2Section";
import CuratedPropertiedSection from "./CuratedPropertiedSection";
import GrowSection from "./GrowSection";
import HeroSection from "./HeroSection";
import LearnMoreSection from "./LearnMoreSection";
import RentSection from "./RentSection";
import TokeninsingSection from "./TokeninsingSection";
import usePost from '../../hooks/usePost';
import { useNavigate, useParams } from 'react-router';
import useLoading from '../../hooks/useLoading';
import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate()
  const { verificationToken } = useParams()
  const { handleAccessTokenAct } = useAuth()
  const { openLoading, closeLoading } = useLoading()
  const { campaigns, getAllCampaignsAct } = useCampaign()
  const { posts, getAllPostsAct } = usePost()

  useEffect(() => {
    if (verificationToken) {
      openLoading()
      api.put(`/auth/email-verify/${verificationToken}`)
        .then(response => {
          handleAccessTokenAct(response.data)
          navigate('/email-verification-result')
          closeLoading()
        })
        .catch(error => {
          console.log('>>>>>>>> error of emailVerificationResult => ', error)
          navigate('/email-verification-result')
          closeLoading()
        })
    } else {
      getAllCampaignsAct()
      getAllPostsAct()
    }
  }, [verificationToken])

  return (
    <Box>
      <HeroSection />
      <CuratedPropertiedSection campaigns={campaigns} sx={{ mt: 12 }} />
      <Banner1Section sx={{ mt: 12 }} />
      <GrowSection sx={{ mt: 12 }} />
      <RentSection sx={{ mt: 12 }} />
      <Banner2Section sx={{ mt: 20 }} />
      <TokeninsingSection sx={{ mt: 10 }} />
      <LearnMoreSection sx={{ my: 12 }} posts={posts} />
    </Box>
  )
}