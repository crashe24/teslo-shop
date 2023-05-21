import { IUser } from '@/interfaces/IUser'

import mongoose, {Schema, model, Model} from 'mongoose'

const userSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true, unique:true},
    password: { type: String, require: true},
    role: { type: String, enum: {
        values: ['admin','client'],
        message: '{VALUE} is not a role',
        default: 'client'
        
    }, require: true
    },
},
{ timestamps: true }
)

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User