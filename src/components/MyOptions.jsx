import { Button, ButtonGroup, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  headerData,
  setClearTable,
  setInsertRow,
  setPrintReport,
  setSalesPostData,
  tableData,
} from "../utils/salesSlice";
import axios from "axios";
import MyToast from "./Toast/MyToast";

const api = import.meta.env.VITE_HEADER_MULTIPLE;

function MyOptions() {
  const [open, setOpen] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const matches = useMediaQuery("(min-width:800px)");
  const dispatch = useDispatch();

  const headerDatas = useSelector(headerData);
  const tableDatas = useSelector(tableData);

  const handleInsert = () => {
    dispatch(setInsertRow(true));
  };
  const handleNew = () => {
    dispatch(setClearTable(true));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const isArrayValid = (obj) => {
      return (
        typeof obj.qty === "number" &&
        obj.qty > 0 &&
        typeof obj.rate === "number" &&
        obj.rate > 0 &&
        typeof obj.vr_no === "number" &&
        obj.vr_no > 0 &&
        typeof obj.sr_no === "number" &&
        typeof obj.description === "string" &&
        obj.description.trim() !== "" &&
        typeof obj.item_code === "string" &&
        obj.item_code.trim() !== "" &&
        typeof obj.item_name === "string" &&
        obj.item_name.trim() !== ""
      );
    };
    const isObjValid = (obj) => {
      return (
        typeof obj.vr_no === "number" &&
        obj.vr_no > 0 &&
        obj.vr_date.trim() !== "" &&
        obj.vr_date.trim() !== "NaN-NaN-NaN" &&
        typeof obj.ac_amt === "number" &&
        obj.ac_amt > 0 &&
        typeof obj.ac_name === "string" &&
        obj.ac_name.trim() !== "" &&
        typeof obj.status === "string" &&
        obj.status.trim() !== ""
      );
    };

    const isArrValid = tableDatas.every(isArrayValid);
    const isHeaderValid = isObjValid(headerDatas);
    if (isArrValid && isHeaderValid) {
      const salesData = {
        header_table: headerDatas,
        detail_table: tableDatas,
      };
      dispatch(setSalesPostData(salesData));
      try {
        const response = await axios.post(api, salesData); //?----post request is not success check the data formate
        setOpen((prev) => ({
          ...prev,
          open: true,
          message: "Voucher saved successfully",
          severity: "success",
        }));
      } catch (err) {
        const data = err.response.data;
        setOpen((prev) => ({
          ...prev,
          open: true,
          message: "Internal server error",
          severity: "error",
        }));
      }
    }
  };
  const handlePrint = () => {
    dispatch(setPrintReport(true));
  };
  return (
    <Grid
      item
      md={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction={"row"}>
        <ButtonGroup
          variant="text"
          orientation={`${matches ? "vertical" : "horizontal"}`}
          size="small"
          aria-label="alignment button group"
          color="primary"
          sx={{ backgroundColor: "rgb(255,230,153)", m: { xs: 2, md: 0 } }}
        >
          <Button onClick={handleNew}>New</Button>
          <Button onClick={handleInsert}>Insert</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handlePrint}>Print</Button>
        </ButtonGroup>
      </Stack>
      <MyToast
        handleClose={handleClose}
        open={open.open}
        message={open.message}
        color={open.severity}
      />
    </Grid>
  );
}

export default MyOptions;
