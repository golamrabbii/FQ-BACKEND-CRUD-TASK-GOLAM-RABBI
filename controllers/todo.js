const ToDo = require('./../models/todo')

exports.getAllData = async (req, res, next) => {
    const todo = await ToDo.find({createdBy: req.user.id})
    res.status(200).json(todo)
}

exports.postData = async (req, res, next) => { 
    const newData = new ToDo(req.body)
    newData.createdBy = req.user.id
    try{
        const todo = await new newData.save()
        res.status(201).json()
    } catch(error){
        error.status = 400
        next(error)

    }
}

exports.getDataById = async (req, res, next) => { 
    const { todoid } = req.params
    try{
        const todo = await ToDo.findById(todoid)
        res.status(200).json(todo)
    } catch(error){
        error.status = 400
        next(error)
    }

}

exports.updateData = async (req, res, next) => { 

    const { todoid } = req.params
    try{
        const todo = await ToDo.findByIdAndUpdate(todoid, req.body)
        res.status(200).json({success: true})
    } catch(error){
        error.status = 400
        next(error)
    }
}

exports.deleteData = async (req, res, next) => { 
    const { todoid } = req.params
    try{
        const todo = await ToDo.findByIdAndRemove(todoid)
        res.status(200).json({success: true})
    } catch(error){
        error.status = 400
        next(error)
    }
}
