import React from "react";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import MyTableRow from "./MyTableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(131,151,176)",
    color: theme.palette.common.white,
    border: "1px solid black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid black",
    height: "20px",
  },
}));

function MyTable() {
  return (
    <Grid
      item
      md={11}
      sx={{ width: "100%", border: { xs: "2px solid black" } }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(255,230,153)",
          width: "100%",
          pt: 1,
          pb: 1,
        }}
      >
        <Typography textAlign={"center"}>Details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl.No</StyledTableCell>
              <StyledTableCell>Item Code</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Rate</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <MyTableRow />
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default MyTable;
