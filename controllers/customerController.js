// controllers/customerController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Customer } = require('../models');

const createCustomer = async (req, res) => {
  try { 
    // Check if the id_number already exists
    const existingCustomer = await Customer.findOne({
      where: { id_number: req.body.id_number }
    });

    if (existingCustomer) {
      return res.status(400).json({ error: 'ID number already exists' });
    }

    let cust_imgbase64 = null;
    let nid_imgbase64 = null;
    const files = req.files;


    if (files && files.cust_img && files.cust_img[0]) {
      // Access buffer directly since file is in memory
      const cust_imgBuffer = files.cust_img[0].buffer;
      cust_imgbase64 = cust_imgBuffer.toString('base64');
    } else {
      console.log("cust_img not found");
    }

    if (files && files.nid_img && files.nid_img[0]) {
      // Access buffer directly since file is in memory
      const nid_imgBuffer = files.nid_img[0].buffer;
      nid_imgbase64 = nid_imgBuffer.toString('base64');
    } else {
      console.log("nid_img not found");
    }

    const customer = await Customer.create({
      id: uuidv4(),
      create_by: req.body.create_by,
      create_date: new Date(),
      modify_by: null,
      modify_date: null,
      cust_status: req.body.cust_status,
      cust_name: req.body.cust_name,
      gender: req.body.gender,
      dob: req.body.dob,
      waitness_name: req.body.waitness_name,
      nationality: req.body.nationality,
      id_number: req.body.id_number,
      village: req.body.village,
      commune: req.body.commune,
      district: req.body.district,
      province: req.body.province,
      phone_number: req.body.phone_number,
      job: req.body.job,
      cust_img: cust_imgbase64,
      nid_img: nid_imgbase64,
    });
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(400).json({ error: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: {
        cust_status: 'active'
      },
      order: [
        ['create_date', 'DESC'] // Order by create_date in ascending order
      ]
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id; // Get customer ID from the request parameters
    const existingCustomer = await Customer.findByPk(customerId); // Find the customer by ID

    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    let cust_imgbase64 = existingCustomer.cust_img; // Keep existing image if not updated
    let nid_imgbase64 = existingCustomer.nid_img; // Keep existing image if not updated
    const files = req.files;

    if (files && files.cust_img && files.cust_img[0]) {
      const cust_imgBuffer = files.cust_img[0].buffer;
      cust_imgbase64 = cust_imgBuffer.toString('base64');
    }

    if (files && files.nid_img && files.nid_img[0]) {
      const nid_imgBuffer = files.nid_img[0].buffer;
      nid_imgbase64 = nid_imgBuffer.toString('base64');
    }

    // Update the existing customer record
    await existingCustomer.update({
      create_by: req.body.create_by || existingCustomer.create_by,
      modify_by: req.body.modify_by,
      modify_date: new Date(),
      cust_status: req.body.cust_status || existingCustomer.cust_status,
      cust_name: req.body.cust_name || existingCustomer.cust_name,
      gender: req.body.gender || existingCustomer.gender,
      dob: req.body.dob || existingCustomer.dob,
      waitness_name: req.body.waitness_name || existingCustomer.waitness_name,
      nationality: req.body.nationality || existingCustomer.nationality,
      id_number: req.body.id_number || existingCustomer.id_number,
      village: req.body.village || existingCustomer.village,
      commune: req.body.commune || existingCustomer.commune,
      district: req.body.district || existingCustomer.district,
      province: req.body.province || existingCustomer.province,
      phone_number: req.body.phone_number || existingCustomer.phone_number,
      job: req.body.job || existingCustomer.job,
      cust_img: cust_imgbase64,
      nid_img: nid_imgbase64,
    });

    res.status(200).json(existingCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
