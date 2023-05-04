
import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
} 
| IProduct[]

export default function searchApi (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
           return searchProducts(req, res) 
           
    
        default:
            return res.status(400).json({message:'Bad request'})
    }
  }

const  searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { name = '' } = req.query
    
    if (name.length === 0 ) {
        return res.status(400).json({message:'put a name in your search!!!'})
    }

    name = name.toString().toLocaleLowerCase()
    await db.connect()
    const productsDb = await Product.find(
        {
            $text: {$search:name}
        }
    )
    .select('title images price inStock slug -_id')
    .lean()
    await db.disconnect()
    return res.status(200).json(productsDb)
    
}
