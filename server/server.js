const express = require('express')
var app = express()
const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'http://192.168.219.249', "https://sky-wcpy.onrender.com","https://skybox.onrender.com"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
const bodyparser=require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var GameModel = require('./Gamemodel');
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
var Validator = require('validator');
const { MongoClient, ServerApiVersion } = require('mongodb');
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";
const jwt = require("jsonwebtoken");
const User=require("./Upload"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors());
mongoose.connect(
  "mongodb+srv://akash85213:cneie1eSkFVrXAM5@cluster0.rwzgvis.mongodb.net/?retryWrites=true&w=majority"
);
const uri = "mongodb+srv://akash85213:cneie1eSkFVrXAM5@cluster0.rwzgvis.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.end("Hello!!!")
})

app.post('/api/otp',(req,res)=>{
    var otp=req.body.otp
    if(otp==='1234')
    res.send("correct")
    else
    res.send("incorrect");
})

app.post('/api/pass',(req,res)=>{
   
    var username=req.body.username
    var password=req.body.password
    var cpassword=req.body.cpassword
    if(password!=cpassword){
        res.send("Please enter same password in both field")
    }
    else if(!Validator.isStrongPassword(password))
    {
        res.send("password must have min one lowercase,one uppercase,one special,8 characters long")
    }
    else{
        GameModel.findOneAndUpdate({username:username},{password:password}).then(()=>{
            res.send("Password updated")

    })
}



    //  if(password===cpassword ){
    //     GameModel.findOneAndUpdate({username:username},{password:password}).then(()=>{
    //         res.send("Password updated")
    //     })

    // }
    // else{
    //     res.send("Please enter correct password")
    // }

})


app.post('/api/forget',(req,res)=>{

    var username=req.body.username
    GameModel.find({username:username}).then((data) => {
        if(data.length>0)
        {res.send(data[0].gmail)}
        else
        res.send("no")
       
       });

  

       
    
})

app.listen(5000,()=>{
    console.log("server staretd at port 5000")
})

const fs = require('fs');

// app.post('/api/register',(req,res)=>{

//     var username=req.body.username;
//     var password=req.body.password;
//     var fullname=req.body.fullname;
//     var gmail=req.body.gmail;
//     fs.mkdir('uploads/'+username,(err)=>{

//     });



//     var newregister = new GameModel({username:username, password:password,fullname:fullname,gmail:gmail})
//     newregister.save().then(()=>{
//         res.send("registered")
//     }).catch((err)=>{
//         res.send(err)
//     });
    
// })
// app.get("/register", (req, res) => {
//   res.send("Hello, this is a GET request to /r");
// });
app.post("/register", async (req, res) => {
  try {
    const { username, password, fullname, email } = req.body;
    // console.log(req.body);
    // console.log("hello");
    fs.mkdir('uploads/'+email,(err)=>{

          });
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      fullname,
      email,
    });

    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  } finally {
    res.end();
  }
});

app.post('/login',async(req,res)=>{

  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  console.log(req.body);
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    console.log(req.body);
    if (passOk) {
      // Authentication successful
      jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          // Handle JWT signing error
          console.error(err);
          res.status(500).json("Internal server error");
        } else {
          res.cookie("token", token,{ sameSite: 'None', secure: true }).json({
            id: userDoc._id,
            email,
          });
        }
      });
    } else {
      // Password is incorrect
      res.status(400).json("Wrong password");
    }
  } else {
    // User not found
    res.status(400).json("User not found");
  }
    
})
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    // console.log(info);
    res.json(info);
  });
});

// app.post("/logout", (req, res) => {
//   res.cookie("token", "").json("ok");
// });
app.post("/logout", (req, res) => {
  res.cookie("token", "", {
    sameSite: "None",
    secure: true,   
    expires: new Date(0) 
  }).json("ok");
});

app.post('/api/site',(req,res)=>{
    username=req.body.username
    GameModel.find({username:username}).then((data) => {
        res.send(data[0].fullname)
       
       });


})


const multer = require('multer');

const fileSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
  });
  var usern='abc';
  const File = mongoose.model('File', fileSchema);  
  const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userFolderPath = 'uploads/' + usern + '/';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }
    cb(null, userFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
  const upload = multer({ storage: storage });

app.post('/api/upload/user',(req,res)=>{
    usern=req.body.email
})

app.post('/api/upload',upload.array('file',100),(req,res)=>{
    

    
//     const { filename, path } = req.file;

//   const newFile = new File({
//     fileName: filename,
//     filePath: path,
//   });


//   newFile.save().then(()=>{
//     res.send('File uploaded successfully') 
// }).catch((err)=>{
//     res.send(err)
// });
res.send("done")


})

app.post('/api/down',(req,res)=>{
  var down3=req.body.download
  var usern3=req.body.email
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {throw err;}
    var filePath = 'uploads/'+usern3+'/'+down3;
  res.download(filePath, down3);
  down3=null;
  usern3=null;
  })

})
// app.post('/api/down', (req, res) => {
//   try {
//     // Extract download and email from the request body
//     const { download: down3, email: usern3 } = req.body;

//     // Extract token from cookies
//     const { token } = req.cookies;
//     console.log(token);
//     // Verify the JWT
//     jwt.verify(token, secret, {}, async (err, info) => {
//       if (err) {
//         // Handle JWT verification error
//         console.error('JWT Verification Error:', err);
//         return res.status(401).json({ error: 'Invalid token' });
//       }

//       // Construct the file path
//       const filePath = 'uploads/' + usern3 + '/' + down3;

//       // Send the file as a download response
//       res.download(filePath, down3, (err) => {
//         if (err) {
//           // Handle file download error
//           console.error('File Download Error:', err);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         // Cleanup variables (if necessary)
//         // down3 = null;
//         // usern3 = null;
//       });
//     });
//   } catch (error) {
//     // Handle general errors
//     console.error('Internal Server Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.use('/api/files', express.static(path.join(__dirname, 'uploads', "geralt@gmail.com")));
app.post('/api/files', (req, res) => {
  var usern3 = req.body.email;
  var filePath = 'uploads/' + usern3;
  app.use('/api/files', express.static(filePath));
  // Check if the directory exists, if not, create it
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Error reading directory');
    }

    // Filter out directories from the list of files
    const filteredFiles = files.filter((file) => {
      return fs.statSync(filePath + '/' + file).isFile();
    });

    res.json(filteredFiles);
  });
});

// app.post('/api/files',(req,res)=>{
//   var usern3=req.body.email

//     var filePath = 'uploads/'+usern3;
//     fs.readdir(filePath, (err, files) => {
//         if (err) {
//           console.error('Error reading directory:', err);
//           return res.status(500).send('Error reading directory');
//         }
    
//         // Filter out directories from the list of files
//         const filteredFiles = files.filter((file) => {
//           return fs.statSync(filePath + '/' + file).isFile();
//         });
    
//         res.json(filteredFiles);
//       });

// })

app.post('/api/delete',(req,res)=>{
  var down3=req.body.download
  var usern3=req.body.email
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {throw err;}
    var filePath = 'uploads/'+usern3+'/'+down3;
    
    fs.unlink(filePath,(error)=>{
        if (error) {
            res.send('Error: ' + error.message);
          } else 
            res.send('Deleted');
    });
    down3=null;
    usern3=null;
})
}) 



