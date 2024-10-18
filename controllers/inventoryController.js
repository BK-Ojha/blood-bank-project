const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
// CREATE INVENTORY 
const createInventoryController = async(req,res) => {
    try{
        const {email} = req.body;
        // validation
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        if(req.body.inventoryType == "out"){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);
            // Calculate Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match:{
                    organization,
                    inventoryType:"in",
                    bloodGroup:requestedBloodGroup,
                    },
                },
                {
                    $group:{
                        _id:"$bloodGroup",
                        total:{$sum: "$quantity"},
                    },
                },
            ]);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;  
            // Calculate OUT Blood Quantity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match:{
                        organization,
                        inventoryType:"out",
                        bloodGroup:requestedBloodGroup,
                    },
                },
                {
                    $group:{
                        _id:"$bloodGroup",
                        total:{$sum: "$quantity"},
                    }, 
                },
            ]) ;
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
            // IN & OUT calculation
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            // Quantity validation
            if(availableQuantityOfBloodGroup < requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                });
            }
            req.body.hospital = user?._id;
        }else{
            req.body.donar = user?._id;
        }
        // Save record (if checked successfuly)
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message: "New blood record added",
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in create Inventory API",
            error,
        });
    }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async(req,res) =>{
    try{
        const inventory = await inventoryModel
        .find({
            organization: req.body.userId,
        })
        .populate("donar")
        .populate("hospital")
        .sort({createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Get all records successfully",
            inventory,
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Get All Inventory",
            error,
        });
    }
};

// GET Hospital BLOOD RECORDS
const getInventoryHospitalController = async(req,res) => {
    try{
        const inventory = await inventoryModel
        .find(req.body.filters)
        .populate("donar")
        .populate("hospital")
        .populate("organization")
        .sort({createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Get hospital consumer records successfully",
            inventory,
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Get consumer Inventory",
            error,
        });
    }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          organization: req.body.userId,
        })
        .limit(3)
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        message: "recent Inventory Data",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Recent Inventory API",
        error,
      });
    }
  };

// GET DONAR RECORDS
const getDonarsController = async (req,res) => {
    try{
        const organization = req.body.userId;
        // find Donars
        const donarId = await inventoryModel.distinct("donar", {
            organization,
        });
        const donars = await userModel.find({ _id: { $in: donarId }});
        return res.status(200).send ({
            success : true,
            message: "Donar Record Fetched Successfully",
            donars,
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donar records",
            error,
        })
    }
};

const getHospitalController = async(req, res) =>{
    try{
        const organization = req.body.userId
        // GET HOSPITAL ID 
        const hospitalId = await inventoryModel.distinct("hospital", {organization,});
        // FIND HOSPITAL
        const hospitals = await userModel.find({
            _id: {$in: hospitalId},
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals Data Fetched Successfully",
            hospitals,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get Hospital API",
            error,
        });
    }
}; 

//  GET ORG PROFILES
const getOrganizationController = async(req, res) =>{
    try{
        const donar = req.body.userId;
        const orgId = await inventoryModel.distinct('organization', {donar});
        // find ORG
        const organizations = await userModel.find({
            _id: {$in: orgId},
        });  
        return res.status(200).send({
            success: true,
            message: "Org Data Fetched Successfully",
            organizations,
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in ORG API",
            error,
        });
    }
}
    //  GET ORG for Hospital
    const getOrganizationForHospitalController = async(req, res) => {
        try{
            const hospital = req.body.userId;
            const orgId = await inventoryModel.distinct("organization", {hospital});
            // find ORG
            const organizations = await userModel.find({
                _id: {$in: orgId},
            });
            return res.status(200).send({
                success: true,
                message: "Hospital Org Data Fetched Successfully",
                organizations,
            });
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in Hospital ORG API",
                error,
            });
        }
    };

module.exports = {
    createInventoryController, 
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
};

