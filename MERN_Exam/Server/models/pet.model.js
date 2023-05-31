const  mongoose =  require ('mongoose');

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pet name is required'],
      minlength: [3, 'Pet name must be at least 3 characters long']
    },
    type: {
      type: String,
      required: [true, 'Pet type is required'],
      minlength: [3, 'Pet type must be at least 3 characters long']
    },
    description: {
      type: String,
      required: [true, 'Pet description is required'],
      minlength: [3, 'Pet description must be at least 3 characters long']
    },
   skills:[String]
  //  skill2:{
  //   type: String,
  //  },
  //  skill3:{
  //   type: String,
  //  },
   
  },
  {
    timestamps: true,
  }
);



const Pet = mongoose.model('Pet', petSchema);

module.exports =  Pet;