import { ISizes } from "@/interfaces"
import { Box, Button } from "@mui/material"
import { FC } from "react"

interface Props {
    selectedSize:ISizes;
    sizes: ISizes[];
    onSelectedSize: (size: ISizes) => void;
}


const SizeSelector:FC<Props> = ({selectedSize, sizes,onSelectedSize}) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button key={size}
                    size={'small'}
                    color={ selectedSize ===size?'primary': 'info'}
                    onClick={ () => onSelectedSize(size)}
                >
                        { size }
                </Button>
            ))
        }
    </Box>
  )
}

export default SizeSelector