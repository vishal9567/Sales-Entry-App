import { Box, Container, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTable,
  salesAmount,
  setHeaderData,
  setVrNumber,
} from "../../utils/salesSlice";

function MyHeader() {
  const amount = useSelector(salesAmount);
  const [formData, setFormData] = useState({
    vr_no: 0,
    vr_date: "",
    ac_name: "",
    ac_amt: amount,
    status: "",
  });
  const dispatch = useDispatch();
  const isClearTable = useSelector(clearTable);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "vr_no" ? (value ? parseInt(value) : "") : value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ac_amt: amount,
    }));
  }, [amount]);
  useEffect(() => {
    if (isClearTable) {
      setFormData({
        vr_no: 0,
        vr_date: "",
        ac_name: "",
        ac_amt: amount,
        status: "",
      });
    }
  }, [isClearTable]);

  useEffect(() => {
    // let createdOn = `${day}-${month}-${year}`;
    // const isoDate = formData?.vr_date;
    // const date = new Date(isoDate);
    // const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const year = date.getFullYear().toString();

    // let createdOn = `${year}-${month}-${day}`;
    const data = {
      vr_no: formData.vr_no,
      vr_date: formData.vr_date,
      ac_name: formData.ac_name,
      ac_amt: formData.ac_amt,
      status: formData.status,
    };
    dispatch(setHeaderData(data));
  }, [formData]);
  useEffect(() => {
    dispatch(setVrNumber(formData.vr_no));
  }, [formData]);

  return (
    <Grid item md={12}>
      <Container>
        <Grid container spacing={2} sx={{ pt: 3, pb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                type="number"
                label={"Vr.No"}
                variant="outlined"
                size="small"
                value={formData?.vr_no}
                name="vr_no"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <TextField
                type="date"
                variant="outlined"
                size="small"
                value={formData?.vr_date}
                name="vr_date"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              label={"Ac.Name"}
              variant="outlined"
              size="small"
              sx={{ marginTop: { xs: 2, md: 3 } }}
              value={formData?.ac_name}
              name="ac_name"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { md: "flex" },
              justifyContent: { md: "center" },
              flexDirection: { md: "column" },
              alignItems: { md: "center" },
            }}
          >
            <TextField
              label={"Status"}
              variant="outlined"
              size="small"
              select
              sx={{ width: { xs: "100%", md: "40%" } }}
              value={formData?.status}
              name="status"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"I"}>I</MenuItem>
            </TextField>
            <TextField
              type="number"
              label={"Ac.Amount"}
              InputProps={{ readOnly: true }}
              variant="outlined"
              size="small"
              sx={{
                marginTop: { xs: 2, md: 3 },
                width: { xs: "100%", md: "40%" },
              }}
              value={formData?.ac_amt}
              name="ac_amt"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default MyHeader;
