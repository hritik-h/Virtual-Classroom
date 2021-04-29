import mongoose from 'mongoose';
import bcrypt from 'bcrypt'



const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const user = mongoose.model('user', UserSchema)

export default user;