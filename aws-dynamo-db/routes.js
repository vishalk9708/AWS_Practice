import express from 'express'
import { createOrUpdate, deleteUserById, getUserById, readAllUsers } from './db.js'

const router = express.Router()

// READ ALL Users
router.get('/users', async(req, res) => {
    const { success, data } = await readAllUsers()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get User by ID
router.get('/user/:id', async(req, res) => {
    const id = req.params.id
    const { success, data } = await getUserById(id)

    if(success){
        return res.json({success, data})
        console.log(success)
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create User
router.post('/user', async(req, res) => {
    const data = req.body
    const { success } = await createOrUpdate(data)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Update User by ID
router.put('/user/:id', async(req, res) => {
    const user = req.body
    const { id } = req.params
    user.id = id
    const { success, data } = await createOrUpdate(user)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete User by Id
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteUserById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  



export default router