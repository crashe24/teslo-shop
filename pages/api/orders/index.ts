
import { IOrder } from '@/interfaces'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '@/database';
import { Order, Product } from '@/models';
import { getToken } from 'next-auth/jwt';


type Data = {   message: string }
            | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {
        case 'POST':
                return createOrder(req, res)
           
    
        default:
            return res.status(400).json({message:'Bad Request'})
    }
  
    //res.status(200).json({ message: 'Example' })
}

const  createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder
  
    // verificar la session del usuario
   // const session  = await getSession({ req })
    const session = await getToken({req})
    console.log('SESSION --> ', session)
    if (!session ) {
        return res.status(401).json({ message: 'Debe de estar autenticado'})
    }

    // validacion del precio entre la bdd y los productos enviados
    const productsId = orderItems.map( p => p._id)
    await db.connect()
    const dbProd = await Product.find( { _id: { $in:productsId}})

    try {
        const subTotal = orderItems.reduce( (prev , current ) =>  {

         const currentPrice = dbProd.find( p => p.id === current._id)?.price

         if ( !currentPrice ) {
            throw new Error('Verifique el carrito de nuevo, producto no existe')
         }


         return   (currentPrice * current.quantity) + prev

        }, 0
        )

        const taxesRef = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const bakendTotal = subTotal * (taxesRef + 1)

        if (total !== bakendTotal) {
            throw new Error('Total no concuerda')
        }
     
        // Se encuentra todo correcto
        const userId = session.user._id
        const newOrder = new Order({...req.body, isPaid: false, user:userId})
        await newOrder.save()
        await db.disconnect()
        return res.status(201).json(newOrder)
    } catch (error: any ) {
        await db.disconnect()
        console.log(error)
        res.status(400).json({ message: error.message || 'Revise el log del servidor'})
    }



    return res.status(201).json(req.body)
}
