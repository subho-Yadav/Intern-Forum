const internModel = require("../Models/internModel")
const collageModel = require("../Models/collegeModel")
const { isValidEmail, isValid, isValidMobile } = require("../Middlewares/InternValidator")

//============================>> Create Intern <<==============================>>>

const createIntern = async function (req, res) {
    try {
        let Data = req.body
        const { name, email, mobile, collegeName } = Data
        //--------------------------->> Check Validation <<---------------------------->>>
        if (Object.keys(Data).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide request body its mandatory" })
        }
        if (!name) return res.status(400).send({ status: false, msg: "please provide the name in request body" })
        if (!email) return res.status(400).send({ status: false, msg: "please provide the email in request body" })
        if (!mobile) return res.status(400).send({ status: false, msg: "please provide the mobile in request body" })
        if (!collegeName) return res.status(400).send({ status: false, msg: "please provide the collageName in request body" })

        if (!isValid(name)) return res.status(400).send({ status: false, msg: "please provide the valide name" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "please provide valide email" })
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "please provide the valide mobile" })
        if (!isValid(collegeName)) return res.status(400).send({ status: false, msg: "please provide the valide coolageId" })

        let isvalidEmail = await internModel.findOne({ email: email })
        if (isvalidEmail) return res.status(400).send({ status: false, msg: "this email is already exists" })
        let isvalidMobile = await internModel.findOne({ mobile: mobile })
        if (isvalidMobile) return res.status(400).send({ status: false, msg: "this mobile is already exists" })
        let isvalidCollage = await collageModel.findOne({ name: collegeName })
        if (!isvalidCollage) return res.status(404).send({ status: false, msg: "no such college found " })

        //---------------------------->> Validation End <<----------------------------------->>>

        let collageId = isvalidCollage._id.toString()
        Data.collegeId = collageId
        delete Data.collegeName
        let createIntern = await internModel.create(Data)
        return res.status(201).send({ status: true, message: createIntern })

    }catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//===========================>> Export Function <<============================>>>

module.exports = { createIntern }
