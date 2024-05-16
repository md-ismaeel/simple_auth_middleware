const express = require('express');
const fs = require('node:fs')

const server = express();
const port = 8000;


const loginMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    
    console.log('created by ismail');
    console.log(`Received timestamp ${timestamp}, request method ${method}, and url ${url}`);

    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`Request for url ${url} processed in ${duration}ms`);
    });


    next();
}
server.use(loginMiddleware)

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI settings.",
        price: 25.99,
        category: "Electronics",
        stock: 150
    },
    {
        id: 2,
        name: "Bluetooth Headphones",
        description: "Over-ear Bluetooth headphones with noise cancellation.",
        price: 89.99,
        category: "Electronics",
        stock: 75
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with customizable keys.",
        price: 79.99,
        category: "Electronics",
        stock: 50
    },
    {
        id: 4,
        name: "4K Monitor",
        description: "27-inch 4K UHD monitor with HDR support.",
        price: 349.99,
        category: "Electronics",
        stock: 30
    },
    {
        id: 5,
        name: "Smart Watch",
        description: "Smart watch with heart rate monitor and GPS tracking.",
        price: 199.99,
        category: "Wearables",
        stock: 200
    },
    {
        id: 6,
        name: "Portable Charger",
        description: "10000mAh portable charger with quick charge support.",
        price: 29.99,
        category: "Accessories",
        stock: 500
    },
    {
        id: 7,
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics.",
        price: 39.99,
        category: "Accessories",
        stock: 120
    },
    {
        id: 8,
        name: "External Hard Drive",
        description: "1TB external hard drive with USB 3.0 interface.",
        price: 59.99,
        category: "Storage",
        stock: 100
    },
    {
        id: 9,
        name: "Smartphone",
        description: "Latest model smartphone with 128GB storage and 6GB RAM.",
        price: 699.99,
        category: "Electronics",
        stock: 60
    },
    {
        id: 10,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with charging case and touch controls.",
        price: 49.99,
        category: "Audio",
        stock: 300
    }
];


server.get('/api/v1/product', (req, res, next) => {

    try {
        res.json({
            success: true,
            message: 'data fetched successfully',
            data: [...products]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'internal Server Error',
        })
    }
})

server.post('/api/v1/register/:id', (req, res, next) => {
    try {
        // console.log(products);
        const data = products.find((e) => e.id === Number(req.params.id))
        if (data) {
            // console.log("data", data);
            res.json({
                success: true,
                message: 'user registered Successfully',
                userData: data
            })
        } else {
            res.status(404).json({
                message: 'product not found'
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})

server.listen(port, () => { console.log(`Server is running on port ${port}`); })