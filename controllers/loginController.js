const {User, verifyPassword} = require('../models/user')
const jwt = require('jsonwebtoken')
require('../utils/db')

const loginView = (req, res) => {
    res.render('../views/login-page', {
        layout : 'main',
        errors : req.flash('errors'),
    })
}

const loginAuth = async(req, res) => {
    const nim = req.body.nim
    const password = req.body.password

    if (nim === '030400' && password == '1234') {
        const admin = await User.findOne({uid : '030400'})
        req.session.userName = 'Admin'
        req.session._id = admin._id
        return res.redirect('/admin')
    }
    const userLog = await User.findOne({
        uid : nim
    })
    console.log(userLog)

    if (!userLog) {
        req.flash('errors', 'errors')
    return res.redirect('/login')
    }
    
    let passwordVerify = await verifyPassword(password, userLog.password)
    
    if (passwordVerify) {
        req.session.userName = userLog.name
        req.session._id = userLog._id
        req.session.details = userLog
        return res.redirect('/')
    }
    req.flash('errors', 'errors')
    return res.redirect('/login')
}

const logout = (req, res) => {
    req.session.destroy(error => {
        res.redirect('/login')
    })
}

module.exports = {
    loginView,
    loginAuth,
    logout,
}