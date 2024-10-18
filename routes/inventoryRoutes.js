const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { 
    createInventoryController, 
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();
// Routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);
// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryController );
// GET RECENT BLOOD RECORDS
router.get("/get-recent-inventory", authMiddelware, getRecentInventoryController );
// GET HOSPITAL BLOOD RECORDS
router.post("/get-inventory-hospital", authMiddelware, getInventoryHospitalController );
// GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getDonarsController );
// GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController );
// GET ORGANIZATION RECORDS
router.get("/get-organization", authMiddelware, getOrganizationController );
// GET organization RECORDS
router.get("/get-organization-for-hospital", authMiddelware, getOrganizationForHospitalController );
module.exports = router;
