const { File } = require('../models/files')
const jwt = require('jsonwebtoken')
require('dotenv').config()

require('../utils/db')

const home = async (req, res) => {
    let user, fileUser
    const token = req.cookies['x-access-token']
    if (token) user = jwt.verify(token, process.env.SECRET_KEY)
    if (user?.data?._id) fileUser = await File.find({uploader : user?.data?._id})
    res.render('../views/home-page', {
        layout : 'main',
        user : user?.data?.name,
        details : user?.data,
        errorsUpdate : req.flash('errors-update-user'),
        successUpdate : req.flash('success-update-user'),
        errorsFile : req.flash('errors-add-file'),
        successFile : req.flash('success-add-file'),
        file : fileUser
    })
}

module.exports = {
    home
}