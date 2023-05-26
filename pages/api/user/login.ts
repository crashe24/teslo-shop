
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
        case 'POST':
                return loginUser(req, res)
            
    
        default:
            res.status(400).json({message:'Exist a problem with user'})
    }

    res.status(200).json({ message: 'apilogin' })
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    
    const {email ='', password= ''} = req.body
    await db.connect()
        //const user = await User.findOne({email})
      //  console.log('email ->', email)
        const user = await User.findOne({email})
     //   console.log('user -> ', user)   
    await db.disconnect()

    if (!user) {
        return res.status(400).json({message:'user or password incorrect1' })
    }

    if (!compareSync(password, user.password!)) {
        return res.status(400).json({message:'user or password incorrect'})
    }

     const { role, name, _id } = user

     const token = jwtUtil.signToken(_id,email)

    // console.log('token -> ', token)   
    return res.status(200).json({
        token,//: '',
        user: {
             email, role, name 
        }
    })
    
}
