require('../utils/db')

const { User, createPassword } = require('../models/user')

const admin = new User({
    name : 'Admin',
    uid : '030400',
    password : createPassword('1234')
})

console.log(admin)

admin.save()