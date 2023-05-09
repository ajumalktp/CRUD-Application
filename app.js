// imports
const connectDB=require('./dbConnect')
const express=require('express')
const {engine}=require('express-handlebars')
const session=require('express-session');
const { connect } = require('http2');

const app=express()


const PORT=8000;

// database connection
connectDB()

app.engine('hbs', engine({extname:'.hbs'}))
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('userLogin')
})
app.get('/signUp',(req,res)=>{
    res.render('userSignUP')
})
app.get('/home',(req,res)=>{
    res.render('userHome')
})
app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))