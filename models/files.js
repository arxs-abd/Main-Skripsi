require('../utils/db')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const {stopWord} = require('../utils/stopWord')
const {userSchema} = require('../models/user')
const sastrawi = require('sastrawijs')
const allChar = ["-", " ", ""]

const stemmer = new sastrawi.Stemmer()
const tokenizer = new sastrawi.Tokenizer()

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    fileName : {
        type : String,
        required : true
    },
    uploader : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true,
    },
})
fileSchema.plugin(mongoosePaginate)
const File = mongoose.model('File', fileSchema)

const sanitizePdf2 = (text) => {
    const textFix = text.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ')
    const newData = []
    // remove Stopword
    textFix.toLowerCase().split(' ').forEach(e => {
        e.trim()
        if (e.length > 2 && !stopWord.includes(e) && !allChar.includes(e)) newData.push(e)
    })
    return newData.join(' ')
}
const sanitizePdf = (text) => {
    const textFix = tokenizer.tokenize(text)
    const newData = []
    textFix.forEach(e => {
        // e.trim()
        if (e.length > 2 && !stopWord.includes(e)) newData.push(stemmer.stem(e))
    })
    return newData.join(' ')
}
// const newUser = new user({
//     name : 'Aris Akhyar Abdillah',
//     uid : 'H071171505',
//     password : bcrypt.hashSync("12345", salt)
// })

// newUser.save().then(res => {
//     console.log(res)
// })

module.exports = {
    File,
    sanitizePdf
}