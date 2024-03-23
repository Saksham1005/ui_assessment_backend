const Component = require("../models/component");
const Type = require("../models/type");

const { ObjectId } = require("mongoose").Types;

const yup = require("yup");

require("dotenv").config();

// Middlewares
const { errorResponse } = require("../middlewares/error_response");

// Helpers
const { schemaValidator } = require("../helpers/schemaValidator");

module.exports.add = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      component: yup.number().required("Component is required!"),
    });

    let validate = await schemaValidator(req.params, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    let component = req.params.component;

    let component_object= await Component.create({component});

    await Type.findOneAndUpdate({component}, { document: component_object.id, {$inc: {count: 1}} } );

    return res.status(200).json({
      message: "Entry added in collection!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.update = async (req, res) => {
  try {
    // Check all the required fields
    let schema = yup.object({
      component: yup.number().required("Component is required!"),
      description: yup.string().required("Description is required!"),
    });

    let validate = await schemaValidator(req.body, schema);

    if (!validate.status) {
      return errorResponse(res, validate.error, 400);
    }

    // Initialization
    let component = req.body.component;
    let description = req.body.description;

    let type_object= await Type.findOne({component});

    let component_object; 

    // If first time component is updated without entry in Type collection.
    if(!type_object){
      component_object= await Component.create({component, description});
    }
    else{
      component_object= await Component.findOneAndUpdate({id: type_object.document}, {description});
    }

    await Type.findOneAndUpdate({component}, {document: component_object.id, {$inc: {count: 1}}});

    return res.status(200).json({
      message: "Updated the Entry in the Collection!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};

module.exports.count = async (req, res) => {
  try {
    let types= await Type.find({}).lean().exec();

    let total_count=0;

    for(let type: types){
      total_count+= type.count; 
    }

    return res.status(200).json({
      message: "Fetched the total count of Add and Update APIs called!",
      count: total_count,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error!", 500, error);
  }
};