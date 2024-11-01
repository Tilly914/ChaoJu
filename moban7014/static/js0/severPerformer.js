const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL数据库连接配置
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 替换为你的MySQL用户名
  password: '123456', // 替换为你的MySQL密码
  database: 'BlogDB' // 确保数据库名称正确
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // 允许跨域请求

// API路由 - 获取演员帖子列表
app.get('/api/performers', (req, res) => {
    pool.query('SELECT * FROM performer', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(results);
        }
    });
});

// API路由 - 创建新演员帖子
app.post('/api/performers', (req, res) => {
    const { name, troupe, works } = req.body;
    pool.query('INSERT INTO performer (name, troupe, works) VALUES (?, ?, ?)', [name, troupe, works], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json({ id: results.insertId, name, troupe, works });
        }
    });
});

// API路由 - 删除演员帖子
app.delete('/api/performers/:id', (req, res) => {
    const performerId = req.params.id;
    pool.query('DELETE FROM performer WHERE id = ?', [performerId], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send({ deleted: results.affectedRows });
        }
    });
});

// API路由 - 更新演员帖子
app.put('/api/performers/:id', (req, res) => {
    const performerId = req.params.id;
    const { name, troupe, works } = req.body;
    pool.query('UPDATE performer SET name = ?, troupe = ?, works = ? WHERE id = ?', [name, troupe, works, performerId], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send({ updated: results.affectedRows });
        }
    });
});

app.listen(port, () => {
    console.log(`Performer server running on http://localhost:${port}`);
});