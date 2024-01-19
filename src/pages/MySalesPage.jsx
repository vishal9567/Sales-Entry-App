import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import MyOptions from '../components/MyOptions'
import SalesPage from '../components/SalesPage'
import MyTable from '../components/SalesEntry/MyTable'

function MySalesPage() {
  return (
    <Container sx={{mt:3}}>
        
        <Grid container >
            <SalesPage/>
            <MyOptions/>
        </Grid>
    
        <Box sx={{width:'100%'}}>

        <Grid container >

        <MyTable/>
        </Grid>
        </Box>
    </Container>
  )
}

export default MySalesPage
