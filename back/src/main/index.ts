import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql';
import {TodoService} from './TodoService';
import * as knex from 'knex';

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

const queryBuilder = knex({
    client: 'mysql',
    connection: undefined
})

const todoService = new TodoService(connection, queryBuilder);

const standardBodyParsers = [bodyParser.json(), bodyParser.urlencoded({extended: false})];
const staticRessources = express.static(__dirname + '/../../../front/public');

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
