const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    // to get only user goals
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    // id: mongoose.SchemaTypes.ObjectId,
    // id: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'Goal', // what is the model that this id is referenced to  //when using .populate() it will get its referenced data
    // },
    // createdAt: {
    //   type: Date,
    //   immutable: true, // ignores editing
    //   default: () => Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   default: () => Date.now(),
    // },
    // age: {
    //   type: Number,
    //   min: 1,
    //   lowercase: true, // converts the   passed text to lower
    //   minLength: 10,
    //   validate: { //only works when create or save
    //     // custom validator
    //     validator: v => v % 2 === 0,
    //     message: props => `${props.value} is not even`,
    //   },
    // },
  },
  // add createdAt & updatedAt field automatically
  { timestamps: true }
)

// goalSchema.methods.textDate = function () {
//   console.log(`schema method: ${this.text}`) // goal.textDate()
// }

// // cant use arrow functions coz we need to use (this)
// goalSchema.statics.findByName = function (name) {
//   return this.find({ name: new RegExp(name, 'i') }) // case insensitive //Goal.findByName("Ahmad")
// }

// goalSchema.query.byName = function (name) {
//   return this.where({ name: new RegExp(name, 'i') }) // case insensitive //Goal.find().byName("Ahmad")
// }
// // virtual property won't be added to DB
// goalSchema.virtual('namedEmail').get(function () {
//   return `${this.name} <${this.email}>` // goal.namedEmail
// })

// mongoose middleware// will run before each save // .post() after
// goalSchema.pre('save', function (next) {
//   this.updatedAt = Date.now()
//   next()
// })
// goalSchema.post('save', (doc, next) => {
//   doc.textDate()
//   next()
// })
module.exports = mongoose.model('Goal', goalSchema) // 'Goal' is the collection name in mongoDB
