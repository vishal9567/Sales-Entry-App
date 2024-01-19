import { createSlice } from "@reduxjs/toolkit";

const initialState={
    salesEntry:null,
    insertRow:false,
    clearTable:false,
    salesAmount:0,
    headerData:null,
    tableData:null,
    vrNumber:0,
    printReport:false,
    salesPostData:null
}

const salesSlice=createSlice({
    name:'sales',
    initialState,
    reducers:{
        setSalesEntry:(state,action)=>{
            state.salesEntry=action.payload
        },
        setInsertRow:(state,action)=>{
            state.insertRow=action.payload
        },
        setClearTable:(state,action)=>{
            state.clearTable=action.payload
        },
        setSalesAmount:(state,action)=>{
            state.salesAmount=action.payload
        },
        setHeaderData:(state,action)=>{
            state.headerData=action.payload
        },
        setTableData:(state,action)=>{
            state.tableData=action.payload
        },
        setVrNumber:(state,action)=>{
            state.vrNumber=action.payload
        },
        setPrintReport:(state,action)=>{
            state.printReport=action.payload
        },
        setSalesPostData:(state,action)=>{
            state.salesPostData=action.payload
        }
    }
}) 
export const {setSalesEntry,setInsertRow,setClearTable,setSalesAmount,setHeaderData,setTableData,setVrNumber,setPrintReport,setSalesPostData} = salesSlice.actions;
export default salesSlice.reducer;
export const salesData=(state)=>state.sales.salesEntry
export const isInsert=(state)=>state.sales.insertRow
export const clearTable=(state)=>state.sales.clearTable
export const salesAmount=(state)=>state.sales.salesAmount
export const headerData=(state)=>state.sales.headerData
export const tableData=(state)=>state.sales.tableData
export const vrNumber=(state)=>state.sales.vrNumber
export const printReport=(state)=>state.sales.printReport
export const salesPostData=(state)=>state.sales.salesPostData