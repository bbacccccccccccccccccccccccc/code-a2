const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path')
const server = express();
const port = 8989
server.use(bodyParser.json());
server.use(cors({
    origin: '*',
    credentials: true
}));

const database = mysql.createConnection({
    host: 'localhost',
    database: 'crowdfunding_db',
    user: 'root',
    password: '123456'
});

database.connect((error) => {
    if (error) {
        throw error
    }
});

server.get('/category', (req, res) => {
    database.query('SELECT * FROM category', (err, data) => {
        if (err) {
            throw err
        };
        res.json(data);
    });
});

server.get('/search', (req, res) => {
    const category = req.query.category;
    let sql = 'SELECT f.*, c.NAME FROM fundraiser as f JOIN category as c ON f.CATEGORY_ID = c.CATEGORY_ID'
    if (category != undefined && category != null && category != 'null') {
        const categoryArray = category.split(',').map(item => item.trim());
        if (categoryArray.length > 0) {
            sql += ` WHERE f.CATEGORY_ID IN (${category})`;
        }
    }
    database.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        res.json(data);
    });
});

server.get('/fundraiser/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT fundraiser.*, category.NAME FROM fundraiser JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID WHERE fundraiser.FUNDRAISER_ID = ' + id;
    database.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        res.json(data);
    });
})

server.use('/file', express.static(path.join(__dirname, 'public/file')));

server.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, 'file', imageName));
});

server.listen(port, () => {
    console.log(`http://localhost:${port} is running!`)
});