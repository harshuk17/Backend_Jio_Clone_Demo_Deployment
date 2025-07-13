const mongoose=require("mongoose");

const schemaRule={
    name:{
        type: String,
        required:[true, "name is required"]
    },
    email:{
        type: String,
        required:[true,"email is required"],
        unique: [true,"unique email is required"]
    },
    password:{
        type:String,
        minLength: [8,"minimum length required is 8"],
        required:[true,"password is required"]
    },
    confirmPassword:{
        type:String,
        required:[true,"confirm password is required"],
        // here we have to write the custom validation
        validate: [function(){
            return this.password===this.confirmPassword
        },"password and confirm password should be same"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin","feed curator","moderator"],
        default:"user"
    }
}

const userSchema= new mongoose.Schema(schemaRule);
// final touch point
// this feature is used for implemeting the hiding of the confirm password in mongo DB -MiddleWare
// **************hooks in mongoDB*****************
userSchema.pre("save",function (){
    this.confirmPassword=undefined 
})
userSchema.post("save",function(){
    this.__v =undefined;
    this.password=undefined;
})
const userModel = mongoose.model("user",userSchema);

// exporting user model file
module.exports=userModel;