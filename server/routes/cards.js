/** @format */

import express from 'express'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello from cards')
})

export default router
