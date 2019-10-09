const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const path = require('path')
const db = require('./db')
const collectionAdmin = "admin"
const collectionTopic = "topic"
const collectionCategory = "category"
const collectionCourse = "course"
const collectionCourseTrainer = "trainee-course"
const collectionTrainee = "trainee"
const collectionTrainer = "trainer"


app.get('/', (req, res) => {
    res.sendFile(path.json(__dirname, 'index.html'))
})
// ========================================================
// ADMIN API

app.post('/api/login', (req, res) => {
    const loginForm = req.body;
    if (!req.body.userName || !loginForm.password || !loginForm.role) {
        res.json({ code: 401, message: 'login false' })
    }

    let coll = '';
    if (req.body.role === 'admin') {
        coll = collectionAdmin
    } else if (req.body.role === 'trainer') {
        coll = collectionTrainer
    } else if (req.body.role === 'trainee') {
        coll = collectionTrainee
    }
    db.getDb().collection(coll).find({ userName: req.body.userName, password: req.body.password }, { userName: req.body.userName, password: req.body.password }).toArray(function (err, result) {
        console.log(result);
        if (err || !result.length) {
            res.json({ code: 401, message: 'login false' })
        }
        else {
            console.log("===============");
            res.json({ code: 200, message: 'login', userId: result[0]._id })
        }
    });
})
// ========================================================
// TRAINER API


app.get('/api/accounts', (req, res) => {
    if (req.query.role === 'trainer') {
        db.getDb().collection(collectionTrainer).find({}).toArray((err, documents) => {
            if (err) {
            } else {
                res.json({ code: 200, result: documents })
            }
        })
    }
    if (req.query.role === 'trainee') {
        db.getDb().collection(collectionTrainee).find({}).toArray((err, documents) => {
            if (err) {
                console.log('err', err)
            } else {
                res.json({ code: 200, result: documents })
            }
        })
    }
})

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

app.get('/api/trainer', (req, res) => {
    db.getDb().collection(collectionTrainer).find({}).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json({ code: 200, result: documents })
        }
    })
})


app.put('/api/trainer', async (req, res) => {
    let trainers = req.body;
    let results = [];
    console.log(trainers);
    await trainers.map((trainerInput) => {
        db.getDb().collection(collectionTrainer).findOneAndUpdate({ _id: db.getPrimaryKey(trainerInput._id) }, {
            $set: {
                userName: trainerInput.userName,
                age: trainerInput.age,
                department: trainerInput.department,
                email: trainerInput.email,
                phoneNumber: trainerInput.phone,
                password: trainerInput.password
            }
        }, { returnOriginal: false }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("1");
                console.log(result);

                results.push(result)
            }
        })
    })
    console.log("2");
    res.json({ code: 200, result: results })
})

// create trainer
app.post('/api/trainer', async (req, res) => {
    let trainers = req.body;
    let results = [];
    await trainers.map(trainerInput => {
        db.getDb().collection(collectionTrainer).insertOne(trainerInput, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                results.push(result)
            }
        })
    })
    res.json({ code: 200, result: results })
})

app.get('/trainer/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainer).findOne({ _id: db.getPrimaryKey(id) }, (err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log(documents)
            res.json(documents)
        }
    })
})
app.delete('/api/trainer/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.getDb().collection(collectionTrainer).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})

// ========================================================
// TRAINEE API

app.get('/api/trainee', (req, res) => {
    db.getDb().collection(collectionTrainee).find({}).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})

app.put('/api/trainee/', (req, res) => {
    let trainees = req.body;
    let results = [];
    trainees.map(traineeInput => {
        db.getDb().collection(collectionTrainee).findOneAndUpdate({ _id: traineeInput._id }, {
            $set: {
                userName: traineeInput.userName,
                age: traineeInput.age,
                department: traineeInput.department,
                email: traineeInput.email,
                phoneNumber: traineeInput.phoneNumber,
                password: traineeInput.password
            }
        }, { returnOriginal: false }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                results.push(result)
            }
        })
    })

    res.json({ code: 200, result: results })
})

// create trainer
app.post('/api/trainee', (req, res) => {

    let trainees = req.body;
    let results = [];
    trainees.map(traineeInput => {
        db.getDb().collection(collectionTrainee).insertOne(traineeInput, (err, result) => {
            if (err) {
                console.log(err);

            } else {
                results.push(result)
            }
        })
    })

    res.json({ code: 200, result: results })


    const traineeInput = req.body;
    console.log(req.body);

})

app.get('/api/trainee/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainee).findOne({ _id: db.getPrimaryKey(id) }, (err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
app.delete('/api/trainee/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionTrainee).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json({ code: 200, result: result })
        }
    })
})

// ========================================================
// COURSE API

// get all
app.get('/api/course', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionCourse).find({}, {}).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json({ code: 200, result: documents })
        }
    })
})
// get by category
app.get('/api/course/:categoryId', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionCourse).find({ categoryId: req.params.categoryId }, { categoryId: req.params.categoryId }).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json(documents)
        }
    })
})
// update
app.put('/api/course', (req, res) => {
    const courseInput = req.body;
    console.log(courseInput);
    console.log("-=========");

    db.getDb().collection(collectionCourse).findOneAndUpdate({ _id: db.getPrimaryKey(courseInput._id) }, {
        $set: {
            name: courseInput.name,
            description: courseInput.description,
            categoryId: courseInput.categoryId,
            trainerId: courseInput.trainerId,
            detail: courseInput.detail,
            topicId: courseInput.topicId
        }
    }, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ code: 200, result })
        }
    })
})

// create 
app.post('/api/course', (req, res) => {
    const courseInput = req.body;
    console.log(courseInput);
    db.getDb().collection(collectionCourse).insertOne(courseInput, (err, result) => {
        if (err) {
        } else {
            res.json({ code: 200, result: result, document: result.ops[0] })
        }
    })
})

// get by id

// delete
app.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCourse).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})

// ========================================================
// TOPIC API

// get all
app.get('/api/topic', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionTopic).find({}).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json({ code: 200, result: documents })
        }
    })
})
// ========================================================
// CATEGORY API

// get all
app.get('/api/category', (req, res) => {
    console.log(req.body);
    db.getDb().collection(collectionCategory).find({}).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json({ code: 200, result: documents })
        }
    })
})
// update
app.put('/category/:id', (req, res) => {
    const id = req.params.id;
    const categoryInput = req.body;
    db.getDb().collection(collectionCategory).findOneAndUpdate({ _id: id }, {
        $set: {
            name: categoryInput.name,
            description: categoryInput.description
        }
    }, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create 
app.post('/category', (req, res) => {
    const categoryInput = req.body;
    db.getDb().collection(collectionCategory).insertOne(categoryInput, (err, result) => {
        if (err) {
        } else {
            res.json({ result: result, document: result.ops[0] })
        }
    })
})

// get by id
app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOne({ _id: db.getPrimaryKey(id) }, (err, documents) => {
        if (err) {
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
    db.getDb().collection(collectionCategory).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
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
app.get('/api/course-byTrainee/:id',  (req, res) => {
    const id = req.params.id;
    let result = [];
    db.getDb().collection(collectionCourseTrainer).find({ traineeId: id }).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log(id);
            console.log(documents);
             documents.map( (d) => {
                 db.getDb().collection(collectionCourse).findOne({}, { _id: db.getPrimaryKey(d.courseId) }, (err, doc) => {
                    if (err) {
                        console.log('err', err)
                    } else {
                        console.log(d.courseId)
                        console.log(doc)
                        result.push(doc)
                    }
                })
            })
            setTimeout(() => {
                console.log(result);
                
                res.json({ code: 200, result: result })
            }, 1000);
        }
    })
})
// get all by course
app.get('/api/course-byCourse/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCourse).findOne({}, { _id: db.getPrimaryKey(id) }, (err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log('documents')
            console.log({ code: 200, result: documents });
            res.json({ code: 200, result: documents })
        }
    })
})
// get all by course
app.get('/api/course-byTrainer/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCourse).find({ trainerId: id }, { trainerId: id }).toArray((err, documents) => {
        if (err) {
            console.log('err', err)
        } else {
            res.json({ code: 200, result: documents })
        }
    })
})
// update
app.put('/trainee-course/:id', (req, res) => {
    const id = req.params.id;
    const traineeCourseInput = req.body;
    db.getDb().collection(collectionCategory).findOneAndUpdate({ _id: id }, {
        $set: {
            courseId: traineeCourseInput.courseId,
            traineeId: categoryInput.courseId
        }
    }, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result)
        }
    })
})

// create 
app.post('/trainee-course', (req, res) => {
    const categoryInput = req.body;
    db.getDb().collection(collectionCategory).insertOne(categoryInput, (err, result) => {
        if (err) {
        } else {
            res.json({ result: result, document: result.ops[0] })
        }
    })
})

// get by id
app.get('/trainee-course/:id', (req, res) => {
    const id = req.params.id;
    db.getDb().collection(collectionCategory).findOne({ _id: db.getPrimaryKey(id) }, (err, documents) => {
        if (err) {
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
    db.getDb().collection(collectionCategory).findOneAndDelete({ _id: db.getPrimaryKey(id) }, (err, result) => {
        if (err) {
            console.log("================Delete has error: ", err);
        } else {
            res.json(result)
        }
    })
})
