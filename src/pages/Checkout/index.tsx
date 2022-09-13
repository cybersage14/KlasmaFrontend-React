import { useState, useEffect, useMemo } from 'react';
import { Box, Container, Grid, Stack } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from 'react-router';
import HeroSection from "./HeroSection";
import OnceTab from "./tabs/OnceTab";
import { ERROR, REGEX_NUMBER_VALID } from '../../utils/constants';
import Details from './Details';
import useCampaign from '../../hooks/useCampaign';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/api';
import useAlertMessage from '../../hooks/useAlertMessage';

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
  orderID: string;
  [key: string]: any;
}

interface IActions {
  order: {
    capture: Function;
    [key: string]: any;
  };
  [key: string]: any;
}

export default function Checkout() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const { openAlert } = useAlertMessage()
  const { campaign, getCampaignByIdAct, investAct } = useCampaign()

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
                    amount={price + fee}
                    // options={{
                    //   clientId: 'process.env.REACT_APP_PAYPAL_CLIENT_ID'
                    // }}
                    // onSuccess={(details: IDetails, data: IData) => {
                    //   console.log('>>>> details => ', details)
                    //   console.log('>>>> data => ', data)

                    //   if (currentUser && campaign) {
                    //     investAct({
                    //       id_user: currentUser?.id_user,
                    //       price,
                    //       fee,
                    //       id_campaign: campaign?.id,
                    //       transaction_id: data.orderID
                    //     })
                    //   }

                    //   // OPTIONAL: Call your server to save the transaction
                    //   // return fetch("/paypal-transaction-complete", {
                    //   //   method: "post",
                    //   //   body: JSON.stringify({
                    //   //     orderID: data.orderID
                    //   //   })
                    //   // });
                    // }}
                    onApprove={(data: IData, actions: IActions) => {
                      api.get(`/campaign/check-is-investment-available/${id}`)
                        .then(response => {
                          console.log('>>>>>>>> response.data => ', response.data)
                          if (response.data === true) {
                            return actions.order.capture().then((details: IDetails) => {
                              if (currentUser && campaign) {
                                investAct({
                                  id_user: currentUser?.id_user,
                                  price,
                                  fee,
                                  id_campaign: campaign?.id,
                                  transaction_id: data.orderID
                                })
                              }
                            })
                          }
                          return;
                        })
                        .catch(error => {
                          openAlert({
                            severity: ERROR,
                            message: error.response.data
                          })
                        })
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