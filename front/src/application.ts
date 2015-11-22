const todo = angular.module('todo', []);

class TodoAppController {

    todos: ITodo[];

    constructor (private todoService: TodoService) {
        todoService.findAll()
            .then(todos => this.todos = todos)
            .catch(() => alert('Error finding todos'));
    }
}

todo.directive('todoApp', () => {
    return {
        restrict: 'E',
        controller: ['TodoService', TodoAppController],
        controllerAs: 'ctrl',
        bindToController: true,
        template: [
            '<h1>Todo App</h1>',
            '<ul>',
                '<li ng-repeat="todo in ctrl.todos">',
                    '<input type="checkbox" ng-model="todo.done"/>',
                    '<span>{{todo.title}}</span>',
                '</li>',
            '</ul>'
        ].join('')
    };
});

interface ITodo {
    id: string;
    title: string;
    description: string;
    date: Date;
    done: boolean;
}

class TodoService {

    constructor (private $http: ng.IHttpService, private $q: ng.IQService) {

    }

    findAll(): ng.IPromise<ITodo[]> {
        return this.$http.get('/todos').then(response => response.data);
    }
}

todo.service('TodoService', ['$http', '$q', TodoService]);

