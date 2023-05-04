import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | IProduct

const  productSlugApi = (req: NextApiRequest, res: NextApiResponse<Data>) => {

  
    switch (req.method) {
        case 'GET':
            return getProductsBySlug(req, res )
           
    
        default:
            return res.status(400).json({message:'bad request'});
    }
 

  

   
}


const getProductsBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { slug } = req.query
    await db.connect()
    const  productdb = await Product.findOne({slug}).lean()
   
    await  db.disconnect()

    if (!productdb) {
        return res.status(404).json({message: 'product not exist'})
    }
    return res.status(200).json(productdb)
}
    
    export default productSlugApi