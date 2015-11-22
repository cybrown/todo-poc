import {TodoService} from '../main/TodoService';
import {expect} from 'chai';

describe('TodoService', () => {

    let todoService: TodoService;
    let connectionMock = {};
    let knexMock = {};

    beforeEach(() => {
        todoService = new TodoService(<any> connectionMock, <any> knexMock);
    });

    it ('should map from database', () => {
        const todo = todoService.mapFromDb({
            id: 3,
            title: 'Todo Title',
            description: 'Todo Description',
            date: new Date('01/01/2005'),
            done: 1
        });
        expect(todo).to.eql({
            id: '3',
            title: 'Todo Title',
            description: 'Todo Description',
            date: new Date('01/01/2005'),
            done: true
        });
    });
});
