require('dotenv').config()
const jwt = require('jsonwebtoken')

const adminVerify = (req, res, next) => {
    const token = req.cookies['x-access-token']
    if (!token) return res.redirect('/')
    const data = jwt.verify(token, process.env.SECRET_KEY)
    if (data.data._id === '624efb042c22458cc919ae71') return next()
    return res.redirect('/')
}


module.exports = {
    adminVerify
}