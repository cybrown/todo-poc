import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql';
import {TodoService} from './TodoService';

const dbHost = '192.168.99.100';
const dbPort = 3306;

const connection = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    database: 'todo',
    user: 'root',
    password: 'ROOT'
});

connection.connect((err) => {
    if (err) {
        console.log(err.stack);
    }
});

const todoService = new TodoService(connection);

const standardBodyParsers = [bodyParser.json(), bodyParser.urlencoded({extended: false})];
const staticRessources = express.static(__dirname + '/../../front/public');

const todoController = express.Router()
        .get('/', ...standardBodyParsers, (req, res) => {
            todoService.findAll()
                .then(todos => res.json(todos))
                .catch(err => res.send(err));
        });

const app = express();
app.use(staticRessources);
app.use('/todos', todoController);

app.listen(3000);
