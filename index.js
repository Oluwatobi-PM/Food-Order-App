const app = require('./middleware/router/app')
const port = process.env.PORT 
app.listen(3003, () => {
    console.log('Server is up on port ' + port)
})