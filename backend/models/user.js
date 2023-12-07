const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  tokens:[
    {
      token:{
        type:String,
        required:true,
      }
    }
  ],
  summary:{
    type:String,
  },
  chat:[
    {
      user:{type:String,required:true,},
      assistant:{type:String,required:true,}
    }
  ],
  // Timestamps for when the user was created and last updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save',async function(next){
  if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,12)
    this.cpassword=await bcrypt.hash(this.cpassword,12)
  }
  next()
})

userSchema.methods.generateAuthToken=async function(){
  try{
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:"1h"})
    this.tokens=this.tokens.concat({token:token})
    await this.save()
    return token
  }catch(err){
    console.log(err)
  }
}

userSchema.methods.addQuerry = async function (user, assistant, summary) {
  try {
      this.chat = this.chat.concat({ user, assistant });
      if (summary) {
          this.summary = summary; // Update the summary if provided
      }
      await this.save();
      return this.chat;
  } catch (err) {
      console.log(err);
      throw err; // Make sure to rethrow the error to handle it in the calling function
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
