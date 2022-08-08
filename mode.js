require('dotenv').config()
const { readFileSync, writeFileSync } = require('fs')

const data = readFileSync('.env', 'utf8')
const newData = []
let status = ''
for (const d of data.split('\n')) {
    if (d.includes('MODE')) {
        if (process.env.MODE === 'maintenence') status = 'production'
        else if (process.env.MODE === 'production') status = 'maintenence'
        newData.push('MODE=' + status)
    } else {
        newData.push(d)
    }
}
writeFileSync('.env', newData.join('\n'))
console.log(`YOUR APLICATION NOW RUNNING IN ${status.toUpperCase()} NOW`)