import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

interface Props {
  currenValue:number;
  maxValues: number;
  updateCuantity: (newValue: number) => void
}

const ItemCounter: FC<Props> = ({currenValue,maxValues,updateCuantity}) => {

  
  // validar cantidad

 

  const addOrRemove = (value:number) => {
    if(value < 0) {
      if (currenValue ===1) return
      return updateCuantity( currenValue -1)
    }

    if(currenValue >= maxValues)  return
      return updateCuantity( currenValue +1)
    
  }

  return (
   <>
    
     
      <Box display={'flex'} alignItems={'center'}>
       
         <IconButton onClick={() => addOrRemove(-1)}>
                 <RemoveCircleOutline />
             </IconButton>
             <Typography sx={{width:40, textAlign:'center'}}>{currenValue}</Typography>
             <IconButton onClick={()=> addOrRemove(1)}>
                 <AddCircleOutline />
             </IconButton>
         </Box>
    </> 
    
  )
}

export default ItemCounter