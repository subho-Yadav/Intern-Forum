
const collegeModel=require('../Models/collegeModel')

const collegeValidator=async (req,res,next)=>{
    if(Object.keys(req.body).length==0){
        return res.status(404).send({status:false,message:"Request body is empty"})
    }
    const isValid=(field)=>{
        if(!req.body[field]){
              res.status(400).send({status:false,message:`${field} is not present`})
             return false
        }
         if (!(typeof req.body[field]=='string')){ 
             res.status(400).send({status:false,message:`Please provide string for ${field}`})
             return false
        }
         if(field=='name'){
        if(!req.body[field].match(/^[A-Za-z]+$/)){
             res.status(400).send({status:false,message:`Please provide a valid ${field}`})
             return false
        }
    }
     if(field=='fullName'){
        if(!req.body[field].match(/^[\D]+$/)){ 
            res.status(400).send({status:false,message:`Please provide a valid ${field}`})
            return false
       }
    }

         if(field=='name'){
            const lc=req.body[field].toLowerCase()
            if(lc!==req.body[field]){
                 res.status(400).send({status:false,message:`All characters in ${field} should be in lowercase`})
                 return false
            }
        }
        return true
    }

    const awsLinkValidator=(url)=>{
        if(!req.body[url]){
            res.status(400).send({status:false,message:"logoLink is not present"})
            return false
        }
        if(!(typeof req.body[url]=='string')){
            res.status(400).send({status:false,message:"logoLink should be string"})
            return false
        }
        
        
        else{
            const stat=req.body[url].match(/(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i)
        if(!stat){
            res.status(400).send({status:false,message:"Invalid logoLink"})
            return false
        }
    }
    return true
    }


    
    
    if(!isValid("name")){
        return
    }
    if(!isValid("fullName"))
    return

    if(!awsLinkValidator("logoLink"))
    return 

    const collegeName=await collegeModel.findOne({name:req.body.name})
    const collegeFullName=await collegeModel.findOne({fullName:req.body.fullName})
     if(collegeName){
        return res.status(400).send({status:false,message:"Duplicate Entry for name"})
    }
    if(collegeFullName){
        return res.status(400).send({status:false,message:"Duplicate Entry for fullName"})
    }
    
    next()
        
}

module.exports.collegeValidator=collegeValidator