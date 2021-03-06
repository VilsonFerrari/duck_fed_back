import app from './config/app'
import Get from './api/get'
import Save from './api/save'
const port = app.get('port')

app.get('/get', Get)
app.post('/save', Save)

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`)
})