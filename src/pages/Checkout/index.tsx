import { useState, useEffect, useMemo } from 'react';
import { Box, Container, Grid, Stack } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from 'react-router';
import HeroSection from "./HeroSection";
import OnceTab from "./tabs/OnceTab";
import { REGEX_NUMBER_VALID } from '../../utils/constants';
import Details from './Details';
import useCampaign from '../../hooks/useCampaign';

interface IDetails {
  payer: {
    name: {
      given_name: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

interface IData {
  orderID: string | number;
  [key: string]: any;
}

export default function Checkout() {
  const { id } = useParams()
  const { campaign, getCampaignByIdAct } = useCampaign()

  const [price, setPrice] = useState<number>(0)
  const [fee, setFee] = useState<number>(0)

  const minFee = useMemo(() => {
    return price / 10
  }, [price])

  useEffect(() => {
    if (id) {
      getCampaignByIdAct(Number(id))
    }
  }, [id])

  useEffect(() => {
    setFee(minFee)
  }, [minFee])

  const handleSetPrice = (value: string) => {
    if (value.match(REGEX_NUMBER_VALID)) {
      setPrice(Number(value));
    }
  };

  const handleSetFee = (value: string) => {
    if (value.match(REGEX_NUMBER_VALID)) {
      if (Number(value) >= minFee) {
        setFee(Number(value))
      }
    }
  }

  return (
    <Box>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 6, pb: 6 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={8}>
            <Stack spacing={2}>
              <OnceTab price={price} handleSetPrice={handleSetPrice} />

              <Box>
                <Container maxWidth="xs">
                  <PayPalButton
                    amount={price}
                    onSuccess={(details: IDetails, data: IData) => {
                      alert("Transaction completed by " + details.payer.name.given_name);

                      // OPTIONAL: Call your server to save the transaction
                      // return fetch("/paypal-transaction-complete", {
                      //   method: "post",
                      //   body: JSON.stringify({
                      //     orderID: data.orderID
                      //   })
                      // });
                    }}
                  />
                </Container>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Details
              campaign={campaign}
              price={price}
              fee={fee}
              handleSetFee={handleSetFee}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}