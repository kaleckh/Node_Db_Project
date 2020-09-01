var express = require("express")
var app = express()
var bodyParser = require('body-parser');
var cors = require("cors");

var PORT = 3001;

app.use(cors())
app.use(bodyParser.json())
let data = [{
        id: 1,
        name: "bench",
        sets: 5,
        reps: 10
    },
    {
        id: 2,
        name: "fly",
        sets: 100,
        reps: 0
    }
]

app.get("/workouts", (req, res) => {
    res.json({
        data: data
    })

})

app.get("/workouts/:id", (req, res) => {
    // return list of workouts
    var id = req.params.id;
    var workout = data.find(workout => {
        return parseInt(id) === workout.id
    })

    res.json({
        data: workout
    })
})

app.post("/workouts", (req, res) => {
    var workout = req.body
    var ids = data.map((element) => {
        return element.id
    })
    var maxId = Math.max(...ids) || 1
    workout.id = maxId + 1
    data.push({
            ...workout,
            id: maxId + 1
        })
        // return workout
    res.json({
        data: data
    })
})

app.put("/workouts/:id", (req, res) => {
    var id = parseInt(req.params.id)

    data = data.map((element) => {
        if (element.id === id) {
            return {
                ...element,
                ...req.body
            }
        } else {
            return element
        }
    })


    res.json({
        data: data
    })

})

app.delete("/workouts/:id", (req, res) => {
    var id = parseInt(req.params.id)


    data = data.filter((workout) => {
        return id !== workout.id
    })

    res.json({
        data: data
    })

})

app.listen(PORT, () => {
    console.log(`listening on PORT = ${PORT}`)
})