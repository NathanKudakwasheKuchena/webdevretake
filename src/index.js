const express = require('express')
const path = require('path');
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const billRouter = require('./routers/bill')

const User = require('./models/user')
const Bill = require('./models/bill')


const app = express()
const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(cors())

app.use(express.static(publicDirectoryPath))

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(billRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const main = async () => {
//     // const bill = await Bill.findById('5c2e505a3253e18a43e612e6')
//     // await bill.populate('owner').execPopulate()
//     // console.log(bill.owner)

//     const user = await User.findById('5f3c58b6e1d5b80a08a4cee9')
//     await user.populate('bills').execPopulate()
//     console.log(user.bills)
// }

// main()