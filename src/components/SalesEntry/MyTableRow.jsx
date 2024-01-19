import {
    IconButton,
    MenuItem,
    Select,
    TableBody,
    TableCell,
    TableRow,
    tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearTable, isInsert, setClearTable, setInsertRow, setSalesAmount, setTableData, vrNumber } from "../../utils/salesSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const itemMaster = import.meta.env.VITE_APP_ITEM_MASTER_API;

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

function MyTableRow() {
    const isInsertRow = useSelector(isInsert);
    const isClearTable = useSelector(clearTable);
    const vrNo = useSelector(vrNumber)
    const dispatch = useDispatch();

    const [masterData, setMasterData] = useState([]);
    const [totalAmt, setTotalAmt] = useState(0)
    const [formData, setFormData] = useState([
        {
            item_code: "",
            item_name: "",
            description: "",
            qty: 0,
            rate: 0,
            amount: 0
        },
    ]);

    const handleChange = (index, field, value) => {
        setFormData((prev) => {
            const updateRows = [...prev];
            updateRows[index] = {
                ...updateRows[index],
                [field]: field === 'qty' || field === 'rate' ? parseInt(value) : value,
            };
            if (field === 'qty' || field === 'rate') {
                const qty = parseFloat(updateRows[index].qty)
                const rate = parseFloat(updateRows[index].rate)
                updateRows[index].amount = qty * rate;
            }
            return updateRows;
        });
    };
    const deleteRow = (index) => {
        const data = formData.filter((_, i) => i !== index);
        setFormData(data);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${itemMaster}`);
                setMasterData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isInsertRow) {
            setFormData((prev) => {
                const updateRows = [...prev];
                const newData = {
                    item_code: "",
                    item_name: "",
                    description: "",
                    qty: 0,
                    rate: 0,
                    amount: 0,
                };
                updateRows.push(newData);
                return updateRows;
            });
        }
        if (isClearTable) {
            setFormData((prev) => {
                const updateRows = [];
                const newData = {
                    item_code: "",
                    item_name: "",
                    description: "",
                    qty: 0,
                    rate: 0,
                    amount: 0,
                };
                updateRows.push(newData);
                return updateRows;
            });
            dispatch(setSalesAmount(0))
        }
        dispatch(setInsertRow(false));
        dispatch(setClearTable(false));
    }, [isInsertRow, isClearTable]);


    useEffect(() => {
        const arr = [...formData]
        const total = arr.reduce((acc, curr) => {
            const amount = parseInt(curr.amount, 10);
            return isNaN(amount) ? acc : acc + amount;
        }, 0);
        setTotalAmt(total)
        dispatch(setSalesAmount(total))
        const newData = formData.map(({ amount, ...rest }, i) => ({ ...rest, sr_no: parseInt(`${i + 1}`), vr_no: parseInt(vrNo) }))
        dispatch(setTableData(newData))
    }, [formData, vrNo]);


    return (
        <TableBody>
            {formData &&
                formData.map((row, index) => (
                    <TableRow key={index}>
                        <StyledTableCell>
                            {index + 1}
                            <IconButton
                                sx={{ color: "black", fontSize: "small" }}
                                onClick={() => deleteRow(index)}
                            >
                                <DeleteForeverIcon fontSize="small" />
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Select
                                size="small"
                                name="item_code"
                                value={row?.item_code}
                                onChange={(e) =>
                                    handleChange(index, e.target.name, e.target.value)
                                }
                                sx={{
                                    width: "100%",
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                    fontSize: '10px'
                                }}
                            >
                                {masterData &&
                                    masterData.map((master) => (
                                        <MenuItem key={master?.item_code} value={master?.item_code}>
                                            {master?.item_code}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Select
                                size="small"
                                name="item_name"
                                value={row?.item_name}
                                onChange={(e) =>
                                    handleChange(index, e.target.name, e.target.value)
                                }
                                sx={{
                                    width: "100%",
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                    fontSize: '10px'
                                }}
                            >
                                {masterData &&
                                    masterData.map((master) => (
                                        <MenuItem key={master?.item_name} value={master?.item_name}>
                                            {master.item_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <input
                                type="text"
                                value={row?.description}
                                name="description"
                                onChange={(e) =>
                                    handleChange(index, e.target.name, e.target.value)
                                }
                                style={{ outline: "none", border: "none", textAlign: "right" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <input
                                type="number"
                                value={row?.qty}
                                name="qty"
                                onChange={(e) =>
                                    handleChange(index, e.target.name, e.target.value)
                                }
                                style={{ outline: "none", border: "none", textAlign: "right" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <input
                                type="number"
                                value={row?.rate}
                                name="rate"
                                onChange={(e) =>
                                    handleChange(index, e.target.name, e.target.value)
                                }
                                style={{ outline: "none", border: "none", textAlign: "right" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <input
                                type="number"
                                value={row?.qty * row?.rate}
                                name="amount"
                                readOnly
                                style={{ outline: "none", border: "none", textAlign: "right" }}
                            />
                        </StyledTableCell>
                    </TableRow>
                ))}
            <TableRow>
                <StyledTableCell align="right" colSpan={7}>
                    Total:-{isNaN(totalAmt) ? 0 : totalAmt}
                </StyledTableCell>
            </TableRow>
        </TableBody>
    );
}

export default MyTableRow;
