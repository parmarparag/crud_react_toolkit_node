import User from '../models/userModel.js'

export const create = async (req,res)=>{
    try {
        const userData = new User(req.body)

        if(!userData){
            return res.status(404).json({msg : "User Data not found"})
        }

        const savedData = await userData.save()
        res.status(200).json(savedData)
    } catch (error) {
        res.status(500).json({error : error})
    }
}


export const getAll = async (req,res)=>{
    try {
        const userData = await User.find()
        if(!userData){
            return res.status(404).json({msg : "User Data not found"})
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({error : error})
    }
}


export const getOne = async (req,res)=>{
    try {
        const userData = await User.findOne({_id : req.params.id})
        if(!userData){
            return res.status(404).json({msg : "User Data not found"})
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({error : error})
    }
}

export const update = async (req,res)=>{
    try {
        const userData = await User.findOne({_id:req.params.id})
        if(!userData){
            return res.status(404).json({msg : "User Data not found"})
        }
        const {fname, lname, email, password} = req.body
        const updatedData = await User.findOneAndUpdate({_id:req.params.id},{fname, lname, email, password},{new:true})
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({error : error})
    }
}


export const deleteData  = async (req,res)=>{
    try {
        const userData = await User.findOne({_id : req.params.id})
        if(!userData){
            return res.status(404).json({msg : "User not exist"})
        }
        await User.findOneAndDelete(req.params.id)
        res.status(200).json({msg : "User deleted successfully"})
    } catch (error) {
        res.status(500).json({error : error})
    }
}