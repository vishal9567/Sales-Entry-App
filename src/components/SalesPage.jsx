import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import MyHeader from './SalesEntry/MyHeader'
import MyTable from './SalesEntry/MyTable'

function SalesPage() {
    return (
        <Grid item md={11} sx={{border:'2px solid black'}}>
             <Box sx={{ backgroundColor: 'yellow', width: '100%',pb:{md:1}, pt:{md:1} }}>
                    <Typography textAlign={'center'}>Header</Typography>
                </Box>
            <Grid container spacing={2} >
                <MyHeader />
            </Grid>
        </Grid>
    )
}

export default SalesPage
