const express=require("express")
const router=express.Router()
const internController=require("../controllers/InternController")

const collegeValidator=require('../Middlewares/collegeValidator')
const collegeController=require('../controllers/collegeController')

router.post('/functionup/colleges',collegeValidator.collegeValidator,collegeController.createCollege)
router.get("/functionup/collegeDetails",collegeController.getcollegedetails)

//-----------------------> create Intern <----------------------------->>
router.post("/functionup/interns",internController.createIntern)

//-----------------------> error handling route <----------------------->>
router.all("/*",function(req,res){
    return res.status(404).send({status:false,msg:"path not found"})
})

module.exports=router;



