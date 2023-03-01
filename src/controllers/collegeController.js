const collegeModels = require("../Models/collegeModel")
const interModels = require("../Models/internModel")
const { isValid } = require("../Middlewares/InternValidator")



const createCollege = async (req, res) => {
   try {
      const data = req.body
      const createdData = await collegeModels.create(data)
      res.status(201).send({ status: true, message: createdData })
   }
   catch (error) {
      res.status(500).send({ status: false, message: error.message })
   }
}


const getcollegedetails = async function (req, res) {
   try {
      const collegename = req.query.collegeName

      if (!isValid(collegename)) return res.status(400).send({ status: false, msg: "please enter valide college name" })

      const els = collegename.toLowerCase()
      if (collegename != els) {
         return res.status(404).send({ status: false, satmsg: "it should be in lowercase " })
      }

      const collegedetail = await collegeModels.findOne({ name: collegename })

      if (!collegedetail) {
         return res.status(404).send({ status: false, msg: "this is not valide college name" })
      }
      const { name, fullName, logoLink, _id } = collegedetail

      const interns = await interModels.find({ collegeId: _id }).select({ name: 1, email: 1, mobile: 1 })

      if (interns.length == 0) {
         return res.status(404).send({ status: false, msg: "no interns founds" })
      }

      let data = {
         name: name,
         fullname: fullName,
         logolink: logoLink,
         interns: interns

      }

      return res.status(200).send({ status: true, data: data })
   }
   catch (error) { return res.status(500).send({ status: false, msg: error.message }) }

}


module.exports.createCollege = createCollege
module.exports.getcollegedetails = getcollegedetails





