import { ISizes } from "@/interfaces"
import { Box, Button } from "@mui/material"
import { FC } from "react"

interface Props {
    selectedSize:ISizes
    sizes: ISizes[]
}


const SizeSelector:FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button key={size}
                    size={'small'}
                    color={ selectedSize ===size?'primary': 'info'}
                >
                        { size }
                </Button>
            ))
        }
    </Box>
  )
}

export default SizeSelector