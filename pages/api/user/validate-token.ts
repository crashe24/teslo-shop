
// nextapi
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models';
import { db } from '@/database';
import {compareSync} from 'bcrypt-ts'
import { jwtUtil } from '@/utils';

type Data = { message: string }
            | { token:string, user: {email: string, role: string, name: string}}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
                return checkJWT(req, res)
            
    
        default:
            res.status(400).json({message:'Exist a problem with user'})
    }

    res.status(200).json({ message: 'apilogin' })
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    
    const { token = ''} = req.cookies

    let _id = ''

    try {
        _id = (await jwtUtil.isValidToken( token )).toString()

    } catch (error) {
        return res.status(401).json({message: 'token is not autorizathed!!!'})
    }
    await db.connect()
    const user = await User.findById({_id}).lean()
    await db.disconnect()

    if (!user) {
        return res.status(400).json({message:'user incorrect!!!' })
    }
    
    const { role, name, email } = user

    return res.status(200).json({
        token : jwtUtil.signToken(_id,email),
        user: {
             email, role, name 
        }
    })
    
   
}
