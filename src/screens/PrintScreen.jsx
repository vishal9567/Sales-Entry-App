import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { salesPostData } from '../utils/salesSlice'

const PrintScreen = React.forwardRef((props, ref) => {
    const salesData = useSelector(salesPostData)
    const tableData = salesData?.detail_table
    return (
        <Container sx={{ border: '1px solid' }} ref={ref}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, pb: 2 }}>
                <Box>
                    <Typography>Voucher No :- {salesData?.header_table?.vr_no}</Typography>
                    <Typography>Ac Name :- {salesData?.header_table?.ac_name}</Typography>
                </Box>
                <Box>
                    <Typography>Date :- {salesData?.header_table?.vr_date}</Typography>
                    <Typography>Status :- {salesData?.header_table?.status}</Typography>
                    <Typography>Total :- {salesData?.header_table?.ac_amt}</Typography>
                </Box>
            </Box>
            <hr />
            <Box>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl.No</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Rate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData && tableData.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item?.sr_no}</TableCell>
                                    <TableCell>{item?.item_code}</TableCell>
                                    <TableCell>{item?.item_name}</TableCell>
                                    <TableCell>{item?.description}</TableCell>
                                    <TableCell>{item?.qty}</TableCell>
                                    <TableCell>{item?.rate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
})

export default PrintScreen
