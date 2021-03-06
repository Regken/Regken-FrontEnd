import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { COMPANY_NAME } from "src/utils/company_details";
import { EditServiceDepositView } from "src/components/service-payment-deposit/edit-service-deposit";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const EditServiceDeposit = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();
  const { userInfo, deposits } = state;
  const { query } = useRouter();
  const [id, setid] = useState(null);
  console.log(deposits);
  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Edit Service Deposit View| {COMPANY_NAME}</title>
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
          <EditServiceDepositView id={id} deposits={deposits} />
        </Container>
      </Box>
    </>
  );
};

EditServiceDeposit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditServiceDeposit;
