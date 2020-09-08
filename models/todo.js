const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const todoSchema = new Schema({
    date : { type: String, required:true},
    time : { type:String, required:true},
    task_description : {type:String, required:true},
    createdBy : {type: Schema.Types.ObjectId, ref : 'user'}

})
module.exports = mongoose.model('todo', todoSchema )
