import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import MyOptions from "../components/MyOptions";
import SalesPage from "../components/SalesPage";
import MyTable from "../components/SalesEntry/MyTable";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { printReport, setPrintReport } from "../utils/salesSlice";
import PrintScreen from "../screens/PrintScreen";

function MySalesPage() {
    const isPrint = useSelector(printReport);
    const dispatch = useDispatch();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
        dispatch(setPrintReport(false));
    }, [isPrint]);

    const getPageMargins = () => {
        return `@page { margin: 50px 50px 50px 50px !important; }`;
    };
    return (
        <Container sx={{ mt: 3 }}>
            {isPrint && <PrintScreen ref={componentRef} />}
            <Grid container>
                <SalesPage />
                <MyOptions />
            </Grid>
            <Box sx={{ width: "100%" }}>
                <Grid container>
                    <MyTable />
                </Grid>
            </Box>
            <style type="text/css" media="print">
                {
                    "\
  @page { size: landscape; }\
"
                }
            </style>
            <style>{getPageMargins()}</style>
        </Container>
    );
}

export default MySalesPage;
