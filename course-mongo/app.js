const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const path = require('path')
const db = require('./db')
const collectionAdmin = "admin"
const collectionCategory = "category"
const collectionCourse = "course"
const collectionCourseTrainer = "course_trainee"
const collectionTrainee = "trainee"
const collectionTrainer = "trainer"


app.get('/', (req, res) => {
    res.sendFile(path.json(__dirname, 'index.html'))
})
// ========================================================
// ADMIN API

app.post('/login', (req, res) => {
    const loginForm = req.body;
    console.log( req.body.userName);
    console.log( req.body.password);
    db.getDb().collection(collectionAdmin).find({userName: loginForm.userName, password: loginForm.password}).toArray((err, result) => {
        if(err) {
            res.json({code: 401, message: 'loggin false'}) 
        } else {
            console.log(result);
            if (result.length) {
                res.json({code: 200, message: 'success'})
            } else {
                res.json({code: 200, message: 'login false'})
            }
        }
    })
})

// ========================================================
// TRAINER API

db.connect((err) => {
    if (err) {
        console.log(err)
        process.exit()
    } else {
        app.listen(3000, () => {
            console.log('conneted to db, app listening on port 3000')
        })
    }
},
)

app.get('/trainer', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionTrainer).find({}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})


app.put('/trainer/:id',(req, res) => {
    const id = req.params.id;
    const trainerInput =   req.body;

    db.getDb().collection(collectionTrainer).findOneAndUpdate({_id: id}, {$set: {
        userName: trainerInput.userName,
        age: trainerInput.age,
        department: trainerInput.department,
        email: trainerInput.email,
        phoneNumber: trainerInput.phoneNumber,
        password: trainerInput.password
    }}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create trainer
app.post('/trainer',(req, res) => {
    const trainerInput =   req.body;
    console.log(req.body);
    db.getDb().collection(collectionTrainer).insertOne(trainerInput,(err, result) => {
        if(err) {
        } else {
            res.json({result: result, document: result.ops[0]})
        }
    })
})

app.get('/trainer/:id', (req, res) => {
    console.log('xxxxxxxxxx');
    const id = req.params.id;
    db.getDb().collection(collectionTrainer).findOne({_id: db.getPrimaryKey(id)},(err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})
app.delete('/trainer/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainer).findOneAndDelete({_id: db.getPrimaryKey(id)}, (err,result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})

// ========================================================
// TRAINEE API

app.get('/trainee', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionTrainee).find({}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})

app.put('/trainee/:id',(req, res) => {
    const id = req.params.id;
    const traineeInput =   req.body;

    db.getDb().collection(collectionTrainee).findOneAndUpdate({_id: id}, {$set: {
        userName: traineeInput.userName,
        age: traineeInput.age,
        department: traineeInput.department,
        email: traineeInput.email,
        phoneNumber: traineeInput.phoneNumber,
        password: traineeInput.password
    }}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create trainer
app.post('/trainee',(req, res) => {
    const traineeInput =   req.body;
    console.log(req.body);
    db.getDb().collection(collectionTrainee).insertOne(traineeInput,(err, result) => {
        if(err) {
        } else {
            res.json({result: result, document: result.ops[0]})
        }
    })
})

app.get('/trainee/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainee).findOne({_id: db.getPrimaryKey(id)},(err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})
app.delete('/trainee/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainee).findOneAndDelete({_id: db.getPrimaryKey(id)}, (err,result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})

// ========================================================
// COURSE API

// get all
app.get('/course', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionCourse).find({}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
// update
app.put('/course/:id',(req, res) => {
    const id = req.params.id;
    const courseInput =   req.body;
    db.getDb().collection(collectionCourse).findOneAndUpdate({_id: id}, {$set: {
        name: courseInput.name,
        description: courseInput.description,
        title: courseInput.title,
        categoryId: courseInput.categoryId,
        trainerId: courseInput.trainerId,
        content: courseInput.content
    }}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create 
app.post('/course',(req, res) => {
    const courseInput =   req.body;
    db.getDb().collection(collectionCourse).insertOne(courseInput,(err, result) => {
        if(err) {
        } else {
            res.json({result: result, document: result.ops[0]})
        }
    })
})

 // get by id
app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(courseInput).findOne({_id: db.getPrimaryKey(id)},(err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})

// delete
app.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCourse).findOneAndDelete({_id: db.getPrimaryKey(id)}, (err,result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})

// ========================================================
// CATEGORY API

// get all
app.get('/category', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionCategory).find({}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
// update
app.put('/category/:id',(req, res) => {
    const id = req.params.id;
    const categoryInput =   req.body;
    db.getDb().collection(collectionCategory).findOneAndUpdate({_id: id}, {$set: {
        name: categoryInput.name,
        description: categoryInput.description
    }}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create 
app.post('/category',(req, res) => {
    const categoryInput =   req.body;
    db.getDb().collection(collectionCategory).insertOne(categoryInput,(err, result) => {
        if(err) {
        } else {
            res.json({result: result, document: result.ops[0]})
        }
    })
})

 // get by id
app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOne({_id: db.getPrimaryKey(id)},(err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})

// delete
app.delete('/category/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOneAndDelete({_id: db.getPrimaryKey(id)}, (err,result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})
// ========================================================
// TRAINEE-COURSE API

// get all by trainee
app.get('/course-byTrainee/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).find({traineeId: id}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
// get all by course
app.get('/course-byCourse/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).find({traineeId: id}).toArray((err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
// update
app.put('/trainee-course/:id',(req, res) => {
    const id = req.params.id;
    const traineeCourseInput =   req.body;
    db.getDb().collection(collectionCategory).findOneAndUpdate({_id: id}, {$set: {
        courseId: traineeCourseInput.courseId,
        traineeId: categoryInput.courseId
    }}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create 
app.post('/trainee-course',(req, res) => {
    const categoryInput =   req.body;
    db.getDb().collection(collectionCategory).insertOne(categoryInput,(err, result) => {
        if(err) {
        } else {
            res.json({result: result, document: result.ops[0]})
        }
    })
})

 // get by id
app.get('/trainee-course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOne({_id: db.getPrimaryKey(id)},(err, documents) => {
        if(err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})

// delete
app.delete('/trainee-course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOneAndDelete({_id: db.getPrimaryKey(id)}, (err,result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})
