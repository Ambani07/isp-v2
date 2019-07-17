const Customer = require('./models/customers');
const User = require('./models/user');
const Product = require('./models/products');
const CustomerProduct = require('./models/customerProduct');


class FakeDb {
    productCustomer = new Product();
    constructor(){
        this.customers = [{
            name: "Ambani",
            surname: "Matsedu",
            email: "example@gmail.com",
            company: "BCX",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
            customerProduct: {
                vlanId : "9665874232",
                term: 3,
                circuitNo: '3365478',
                accessType: 'MetroLink',
                accessSpeed: '12',
                noIPs: '15',
                totalBandwidth: '30',
                localBandwidth: '24',
                intBandwidth: '12',
                productName: "TI-DIS",
                username: "Ella",
                accessUsername: "Ella123"
            }
        },
        {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            company: "Telkom",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
            customerProduct: {
                vlanId : "5416841363543",
                term: 5,
                circuitNo: '7795544474',
                accessType: 'LAN connect',
                accessSpeed: '5',
                noIPs: '2',
                totalBandwidth: '10',
                localBandwidth: '6',
                intBandwidth: '4',
                productName: "EI",
                username: "peter",
                accessUsername: "peter123"
            }
        },
        {
            name: "Lionel",
            surname: "Messi",
            email: "lionel.messi@gmail.com",
            company: "Facebook",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
            customerProduct: {
                vlanId : "23559474",
                term: 1,
                circuitNo: '98985524',
                accessType: 'Managed LAN',
                accessSpeed: '6',
                noIPs: '20',
                totalBandwidth: '20',
                localBandwidth: '12',
                intBandwidth: '8',
                productName: "BCX DI",
                username: "john",
                accessUsername: "john123"
            }
        }];

        this.users = [{
            username : "Test User",
            email : "test@bcx.co.za",
            password : "test" 
        }];

        this.products = [{
            name: "BCX DI",
        },
        {
            name: "EI Hosted"       
        },
        {
            name: "EI Premise"
        },
        {
            name: "Ti-Dis"       
        },
        {
            name: "FTTB"       
        }, {
            name: "FTTH"       
        }];

        this.customerProduct = [{
            term: 5,
            vlanId : "5416841363543",
            circuitNo: '7795544474',
            accessType: 'LAN connect',
            accessSpeed: '5',
            noIPs: '2',
            totalBandwidth: '10',
            localBandwidth: '6',
            intBandwidth: '4',
            productName: "EI",
            username: "peter",
            accessUsername: "peter123"
        },
        {
            term: 1,
            vlanId : "23559474",
            circuitNo: '98985524',
            accessType: 'Managed LAN',
            accessSpeed: '6',
            noIPs: '20',
            totalBandwidth: '20',
            localBandwidth: '12',
            intBandwidth: '8',
            productName: "BCX DI",
            username: "john",
            accessUsername: "john123"
        },
        {
            term: 3,
            vlanId : "9665874232",
            circuitNo: '3365478',
            accessType: 'MetroLink',
            accessSpeed: '12',
            noIPs: '15',
            totalBandwidth: '30',
            localBandwidth: '24',
            intBandwidth: '12',
            productName: "TI-DIS",
            username: "Ella",
            accessUsername: "Ella123"
        }];

    }

    async cleanDb(){
        await User.remove({});
        await Customer.remove({});
        await Product.remove({});
        await CustomerProduct.remove({});
    }

    pushDataToDb(){
        const user = new User(this.users[0]);
        const customer = new Customer(this.customers[0]);
        const product = new Product(this.products[0]);

        this.products.forEach((product) => {
            const newProduct = new Product(product);
            newProduct.user = user;

            Product.findOne({name: newProduct.name}, function(err, foundProduct){
                if(foundProduct){
                    return;
                }else{
                    newProduct.save();
                }
            });

        });

        customer.user = user;
        
        user.customers.push(customer);

        //create customers to DB
        this.customers.forEach((customer) => {
            const newCustomer = new Customer(customer);
            newCustomer.user = user;
            newCustomer.customerProduct.product = new Product(this.products[Math.floor(Math.random() * this.products.length)]);

            user.customers.push(newCustomer);
            newCustomer.save();
        });

        // this.customerProduct.forEach((customerProduct) => {
        //     const newCustomerProduct = new CustomerProduct(customerProduct);
            
        //     newCustomerProduct.user = user;
        //     newCustomerProduct.customer = customer;
        //     newCustomerProduct.product = product;
        //     customer.products.push(newCustomerProduct);
        //     newCustomerProduct.save();
        // });

        customer.save();
        product.save();
        user.save();
    }

    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;
