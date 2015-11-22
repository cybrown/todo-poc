import * as mysqlType from 'mysql';

export interface ITodo {
    id: number,
    title: string,
    description: string,
    date: Date,
    done: boolean
}

export class TodoService {

    constructor (private connection: mysqlType.IConnection) {

    }

    findAll(): Promise<ITodo[]> {
        return new Promise<ITodo[]>((resolve, reject) => {
            this.connection.query('SELECT * FROM todos', (err: any, values: any[]) => {
                if (err) return reject(err);
                resolve(values.map(value => this.mapFromDb(value)));
            });
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
