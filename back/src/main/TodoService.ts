import * as mysqlType from 'mysql';
import * as knexType from 'knex';

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
        return new Promise<ITodo[]>((resolve, reject) => {
            try {
                const query = this.knex
                    .select('id', 'title', 'description', 'date', 'done')
                    .from('todos')
                    .toQuery();
                this.connection.query(query, (err: any, values: any[]) => {
                    if (err) return reject(err);
                    resolve(values.map(value => this.mapFromDb(value)));
                });
            } catch (e) {
                reject(e);
            }
        });
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
