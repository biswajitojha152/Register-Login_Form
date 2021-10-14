const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require('./db/conn');
const Register = require("./models/register");

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res)=>{
    res.render('index');
})
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/register', async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
                
            })
           const register= await registerEmployee.save();
           res.status(201).render('index');
        }
        else{
            res.send("passwords are not matching");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

//Login check

app.post('/login', async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
       const userEmail=await Register.findOne({email});
      if(userEmail.password===password){
          res.status(201).render("index");
      }
      else{
          res.send("password are not matching");
      }
    }
    catch(err){
        res.status(400).send("invalid Email")
    }
})







//npm run dev
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})
