const { default: mongoose } = require("mongoose")

const schemaRule={
    title:{
        type: String,
        required:[true,"Title Name"]
    },
    description:{
        type: String,
        required:[true,"description of movie"]
    },
    releaseYear:{
        type: Number,
        required:[true,"release year is required"]
    },
    genre:{
        type:String,
        required:true,
        enum:['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance','animaation','documentory','other']
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    cast: {
        type: [String],  
        default: []     
    },
    director: {
        type: String,    
        required: false  
    },
    thumbnail: {
        type: String,
        // validate: {
        // validator: function (v) {
        //     return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        // },
        // message: props => `${props.value} is not a valid image URL!`
        // },
        required: false 
    },
    trailer: {
        type: String,
        required: false, // optional
        // validate: {
        // validator: function (v) {
        //     return /^https?:\/\/(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)[\w-]+/.test(v);
        // },
        // message: props => `${props.value} is not a valid trailer link!`
        // }
    },
    isPremium: {
        type: Boolean,
        default: false 
    }
}
const movieSchema= new mongoose.Schema(schemaRule);
const movieModel = mongoose.model("movieModel",movieSchema);

module.exports= movieModel;