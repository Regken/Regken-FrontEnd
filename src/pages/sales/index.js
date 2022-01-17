import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Sales = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { userInfo, paymentType } = state;
  console.log(paymentType);

  useEffect(() => {
    !userInfo && router.push("/auth");
    // getTotalSales(dispatch);
  }, []);
  return (
    <>
      <Head>
        <title>Sales| Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <DynamicComponentWithNoSSR />
        <Container maxWidth={true}>
          <AddSales paymentType={paymentType} />
        </Container>
      </Box>
    </>
  );
};

Sales.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Sales;
