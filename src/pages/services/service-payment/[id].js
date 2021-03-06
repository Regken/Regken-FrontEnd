import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { EditSalesView } from "src/components/sales/edit-sales";
import { COMPANY_NAME } from "src/utils/company_details";
import { EditServicePaymentView } from "src/components/ServicePayment/edit-service";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditServicePayment = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const [id, setid] = useState(null);
  const { userInfo, paymentType, totalSales } = state;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
 
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Services|{COMPANY_NAME}</title>
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
          <EditServicePaymentView totalSales={[]} id={id} paymentType={[paymentType]} />
        </Container>
      </Box>
    </>
  );
};

EditServicePayment.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditServicePayment;
