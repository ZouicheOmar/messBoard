/** @format */

import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  const phrase = 'Users page'
  res.send(phrase)
})

export default router
