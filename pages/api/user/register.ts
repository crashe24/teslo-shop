
// nextapi
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models';
import { db } from '@/database';
import {hashSync, genSaltSync} from 'bcrypt-ts'
import { jwtUtil, validations } from '@/utils';

type Data = { message: string }
            | { token:string, user: {email: string, role: string, name: string}}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
                return registerUser(req, res)
            
    
        default:
            res.status(400).json({message:'Exist a problem with user'})
    }

    res.status(200).json({ message: 'apilogin' })
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    
    const {name = '', email ='', password= ''} = req.body as {name: string,email: string, password:string}
    //console.log('email->', email)
    //console.log('password->', password)
    await db.connect()
        const user = await User.findOne({email})
    await db.disconnect()

    if (user) {
        return res.status(400).json({message:'user exist !!!' })
    }


    if ( password.length<6) {
        return res.status(400).json({message:'password min 6 letters'})
    }

    if ( name.length<6) {
        return res.status(400).json({message:'name min 3 letters'})
    }

    // TODO email
    if ( email.length<6) {
        return res.status(400).json({message:'email is required'})
    }
    if (!validations.isValidEmail(email)) {
        return res.status(400).json({message:'email is not valid'})
    }

    // create user
    const salt = genSaltSync(10)
    
    const newUser = new User({
        email: email.toLowerCase(),
        password:hashSync(password, salt),
        role: 'client',
        name
    })
    
     try {
        await newUser.save({validateBeforeSave:true})
     } catch (error) {
        console.log('error', error)
        return res.status(500).json({message:'your administrator check logs'})
     }

     const {_id} = newUser

     const token = jwtUtil.signToken(_id, email )
    return res.status(200).json({
        token,
        user: {
             email, role: 'client', name 
        }
    })
    
}
