const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type: String, 
        required: [true, "Inventory type require"],
        enum: ["in", "out"],
    },
    bloodGroup:{
        type: String,
        required: [true, "Blood group is required"],
        enum: ["O+","O-","AB+","AB-","A+","A-","B+","B-"],
    },
    quantity:{
        type: Number,
        require: [true, "Blood quantity is required"],
    },
    email:{
        type: String,
        required: [true, "Donar Email is required"],
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true, "Organization is required"],
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:function(){
            return this.inventoryType === "out";
        },
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: function(){
            return this.inventoryType === "in";
        },
    },
}, 
{timestamps : true}
);
module.exports = mongoose.model("Inventory", inventorySchema)
