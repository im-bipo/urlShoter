const express = require('express')
const { handleCreateShotUrl } = require('../controllers/url')

const router = express.router()

router.post('/url',(handleCreateShotUrl))