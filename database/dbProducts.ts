import { Product } from "@/models"
import { db } from "."
import { IProduct } from "@/interfaces"
import { connect } from './db';

export const getProductBySlug = async( slug:string): Promise<IProduct | null> => {
    await db.connect()
        const product = await Product.findOne({slug}).lean()
    await db.disconnect()

    if (!product) {
        return null
    }

    // debe ser serializado como un string
    return JSON.parse( JSON.stringify( product ))
}

interface ProductSlug {
    slug: string
}

export const getAllProductSlugs = async(): Promise<ProductSlug[]> => {
    await db.connect()
        const slugs = await Product.find().select('slug -_id').lean()

    await db.disconnect()

    return slugs
}

export const getProductsByTerm = async ( term: string): Promise<IProduct[]> => {

    await db.connect()
    term = term.toString().toLocaleLowerCase()
    const products = await Product.find({ $text: { $search: term }})
                    .select('title images price inStock slug -_id')
                    .lean()
    await db.disconnect()  
    
    return JSON.parse(JSON.stringify(products))
}

export  const getAllProductsReload = async (): Promise<IProduct[]> => {

    await db.connect()
        const products = await Product.find()
                         .select('title images price inStock slug -_id')
                         .lean()
    await db.disconnect()

    return JSON.parse(JSON.stringify(products ))
}