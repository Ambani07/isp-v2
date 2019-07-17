const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');
const { normalizeErrors } = require('../helpers/mongoose');
const User = require('../models/user');
const Product = require('../models/products');
const UserCrl = require('../controllers/user');
const CustomerProduct = require('../models/customerProduct');
const mongoose = require('mongoose');

router.get('/secret', UserCrl.authMiddleware , function(req, res){
    return res.json({"secret": true});
});

router.get('',  function(req, res){

    Customer.find({})
        .select('-id -__v')
        .populate('user', 'username email _id')
        .populate('customerProduct.product')
        .exec(function(err, foundCustomers){
            if(err){
                return res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find Customer!'}]});
            }

            Product.find({})
            .exec(function(err, foundProducts){
                if(err){
                    return res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find Customer!'}]});
                }
                    return res.json([foundCustomers, foundProducts]);
                });
            });
});

router.get('/:id', function(req, res){
    const customerId = req.params.id;

    Customer.findOne({_id: customerId})
            .select('-id -__v')
            .populate('user', 'username email _id')
            .populate('customerProduct.product')
            .exec(function(err, foundCustomers){
                if(err){
                    return res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find Customer!'}]});
                }

                // console.log(foundCustomers);

                    return res.json(foundCustomers);
                });

});

router.get('/customers/products/:id', function(req, res){
    const productId = req.params.id;
    // console.log(productId);
    Customer.findOne({"customerProduct.product._id":productId})
            .select('-id -__v')
            .populate('user', '-_id __v')
            .populate('customerProduct')
            .populate('product')
            .exec(function(err, foundCustomer){
                if(err){
                    return res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find Customer!'}]});
                }
                // console.log(foundCustomer[2].productId);
                    
                    // Product.findById({_id: mongoose.Types.ObjectId(foundCustomer.productId)}, function(err, foundProducts){
                    //     if(err){
                    //         return res.status(422).send({errors: normalizeErrors(err.errors)});
                    //     }
                    //     console.log(foundCustomer);
                    //     return res.json(foundProducts);
                        
                    // });
                    console.log(foundCustomer);
                    return res.json(foundCustomer);
                });
});


router.get('/customer-product-add', function(req, res){
    Product.find({}, function(err, foundProducts){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        // console.log(foundProducts);
        return res.json(foundProducts);
    });
});



router.post('/customer-product-add', function(req, res){
    const { customerDetails, productDetails } = req.body;
    const { name, surname, email, company, contactPersonName, contactPersonCellNo, contactPersonPhoneNo, address } = customerDetails;
    const { vlanId, productId, term, circuitNo, accessType, 
            accessSpeed, noIPs, totalBandwidth, localBandwidth,
            intBandwidth, teracoConnect, eiOption, prioritisation, 
            productName, username, accessUsername } = productDetails;

    const {userId} = req.body;

    const customer = new Customer({ name, surname, email, company, contactPersonName, contactPersonCellNo, contactPersonPhoneNo, address, 
        productDetails});
    const customerProduct = new CustomerProduct({ vlanId, productId, term, circuitNo, accessType, 
        accessSpeed, noIPs, totalBandwidth, localBandwidth,
        intBandwidth, teracoConnect, eiOption, prioritisation, 
        productName, username, accessUsername });


        customer.customerProduct.vlanId = productDetails.vlanId;
        customer.customerProduct.term = productDetails.term;
        customer.customerProduct.circuitNo = productDetails.circuitNo;
        customer.customerProduct.accessType = productDetails.accessType;
        customer.customerProduct.accessSpeed = productDetails.accessSpeed;
        customer.customerProduct.noIPs = productDetails.noIPs;
        customer.customerProduct.totalBandwidth = productDetails.totalBandwidth;
        customer.customerProduct.localBandwidth = productDetails.localBandwidth;
        customer.customerProduct.intBandwidth = productDetails.intBandwidth;
        customer.customerProduct.teracoConnect = productDetails.teracoConnect;
        customer.customerProduct.eiOption = productDetails.eiOption;
        customer.customerProduct.prioritisation = productDetails.prioritisation;
        customer.customerProduct.productName = productDetails.productName;
        customer.customerProduct.username = productDetails.username;
        customer.customerProduct.accessUsername = productDetails.accessUsername;
        customer.user = userId;
        customer.customerProduct.product = productId;

        Customer.create(customer, function(err, newCustomer){
            if(err){
                // console.log('error creating product');
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            User.update({_id: userId}, {$push: {customers: newCustomer._id}}, function(){});
            return res.json(newCustomer);

        });

        // Customer.create(customer, function(err, newCustomer){
        //     if(err){
        //         console.log('error creating customer');
        //         return res.status(422).send({errors: normalizeErrors(err.errors)});
        //     }

        //     // newCustomer.user = mongoose.Types.ObjectId(userId);

        //     this.customer = newCustomer;

        //     User.update({_id: userId}, {$push: {customers: newCustomer._id}}, function(){});
            
        // });

        // CustomerProduct.create(customerProduct, function(err, newCustomerProduct){
        //     if(err){
        //         console.log('error creating product');
        //         return res.status(422).send({errors: normalizeErrors(err.errors)});
        //     }

        //     Customer.create(customer, function(err, newCustomer){
        //         if(err){
        //             console.log('error creating product');
        //             return res.status(422).send({errors: normalizeErrors(err.errors)});
        //         }
        //         newCustomer.products.push(newCustomerProduct);
        //         newCustomer.user = userId;
        //         this.customer = newCustomer;
        //     });

        //     newCustomerProduct.user = userId;
        //     newCustomerProduct.customer = this.customer;

        //     return res.json(customerProduct);
        // });



    // Customer.create(customer, function(err, newCustomer){
    //     if(err){
    //         console.log('error creating customer');
    //         return res.status(422).send({errors: normalizeErrors(err.errors)});
    //     }

    //     // newCustomer.user = mongoose.Types.ObjectId(userId);

    //     this.customer = newCustomer;

    //     User.update({_id: userId}, {$push: {customers: newCustomer._id}}, function(){});
        
    // });

    // CustomerProduct.create(customerProduct, function(err, newCustomerProduct){
    //     if(err){
    //         console.log('error creating product');
    //         return res.status(422).send({errors: normalizeErrors(err.errors)});
    //     }

    //     // console.log(customer);
    //     this.customerProduct = newCustomerProduct;
    //     // console.log(customerProduct);

    //     Customer.update({_id: customer._id}, {customerProductId: mongoose.Types.ObjectId(newCustomerProduct._id)}, function(){});

    //     Customer.update({_id: customer._id}, {user: mongoose.Types.ObjectId(userId)}, function(){});

    //     return res.json(customerProduct);
    // });

    
});

module.exports = router;