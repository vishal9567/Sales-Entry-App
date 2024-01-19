import { Button, ButtonGroup, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {  headerData, isInsert, setClearTable, setInsertRow } from '../utils/salesSlice'


function MyOptions() {
    const matches=useMediaQuery('(min-width:600px)')
    const dispatch=useDispatch()

    const headerDatas=useSelector(headerData)
    console.log(headerDatas)

    const handleInsert=()=>{
        dispatch(setInsertRow(true))
    }
    const handleNew=()=>{
        dispatch(setClearTable(true))
    }
    return (
        <Grid item md={1} sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Stack direction={'row'}>
            <ButtonGroup variant='text' orientation={`${matches?'vertical':'horizontal'}`}  size='small' aria-label='alignment button group' color='primary' sx={{backgroundColor:'rgb(255,230,153)',m:{xs:2,md:0}}}>
                <Button onClick={handleNew}>New</Button>
                <Button onClick={handleInsert}>Insert</Button>
                <Button>Save</Button>
                <Button>Print</Button>
            </ButtonGroup>
            </Stack>
        </Grid>
    )
}

export default MyOptions
