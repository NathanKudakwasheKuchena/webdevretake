const express = require('express')
const Bill = require('../models/bill')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/bills', auth, async (req, res) => {
    const bill = new Bill({
        ...req.body,
        owner: req.user._id
    })

    try {
        await bill.save()
        res.status(201).send(bill)
    } catch (e) {
        res.status(400).send(e)
    }
})


// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/bills', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'bills',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.bills)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/bills/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const bill = await Bill.findOne({ _id, owner: req.user._id })

        if (!bill) {
            return res.status(404).send()
        }

        res.send(bill)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/bills/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date', 'previousReading', 'currentReading', 'consumption', 'cost', 'meterNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const bill = await Bill.findOne({ _id: req.params.id, owner: req.user._id})

        if (!bill) {
            return res.status(404).send()
        }

        updates.forEach((update) => bill[update] = req.body[update])
        await bill.save()

        res.send(bill)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/bills/:id', auth, async (req, res) => {
    try {
        const bill = await Bill.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!bill) {
            res.status(404).send()
        }

        res.send(bill)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router