import * as mysqlType from 'mysql';
import * as knexType from 'knex';
import {fromNode} from './util';

export interface ITodo {
    id: number,
    title: string,
    description: string,
    date: Date,
    done: boolean
}

export class TodoService {

    constructor (private connection: mysqlType.IConnection, private knex: knexType) {

    }

    findAll(): Promise<ITodo[]> {
        const query = this.knex
            .select('id', 'title', 'description', 'date', 'done')
            .from('todos')
            .toQuery();
        return fromNode<any[]>(cb => this.connection.query(query, cb))
            .then(values => values.map(value => this.mapFromDb(value)));
    }

    mapFromDb(valueFromDb: any): ITodo {
        return {
            id: valueFromDb.id.toString(),
            title: valueFromDb.title,
            description: valueFromDb.description,
            date: valueFromDb.date,
            done: !!valueFromDb.done
        };
    }
}
