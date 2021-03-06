var mongoose = require('mongoose'),
Schema = mongoose.Schema,
    AssignmentQuestion = require('./assignmentQuestion.js'),
    AssignmentQuestionSchema = mongoose.model('AssignmentQuestion').schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    title                   : {type : String, required : true},
    description             : {type : String, required : true},
    timeAvailable           : {type : Number},
    dateDue                 : {type : Date},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    assignmentQuestions     : [{type : Schema.Types.ObjectId, ref : 'AssignmentQuestion'}]
});
schema.pre('remove', function(callback) {
    // Remove all the docs that refers
    this.model('AssignmentQuestion').remove({_id: {$in: this.assignmentQuestions}}, callback);
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Assignment',schema);