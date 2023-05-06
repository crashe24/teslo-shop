
import { db, SHOP_CONSTANT } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = { message: string } | IProduct[]

const productApi =  (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res )
           
    
        default:
            return res.status(400).json({message:'bad request'});
    }
  
}

const getProducts = async  (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender= 'all' } = req.query
    console.log('gender', gender)
    
    let condition = {}
  //  const genders: string[] = ['kid', 'unisex', 'men', 'women', 'all'] 
    if (gender !== 'all' && SHOP_CONSTANT.validGenders.includes(`${gender}`) ) {
            condition = { gender }
    }
    await db.connect()
    const  products  = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean()
    console.log('data', products)
    await db.disconnect()

    return res.status(200).json( products )
}

export default productApi; 
