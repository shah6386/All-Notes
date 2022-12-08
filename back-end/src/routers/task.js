const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {

    const task = new Task({
        heading: req.body.title,
        body: req.body.summary
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {

    // const task = new Task({
    //     heading: "sdhbjhsdb",
    //     body: "sjhdv"
    // })
    // await task.save()

    const tasks = await Task.find({})

    // console.log(tasks);

    res.send(tasks)
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router