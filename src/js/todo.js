window.jQuery = require('jquery')
require('bootstrap')

const angular = require('angular')
const API_BASE = '/api'
const ERROR_MESSAGE_DURATION = 3000

angular.module('todoApp', [])
  .controller('TodoListController', function ($scope, $http) {
    let todoList = this

    // Default filtering by 'completed' field
    todoList.completedFilter = null

    // Change filter state
    todoList.filterCompleted = state => {
      todoList.completedFilter = state
    }

    // Change 'complete' state of all Todos
    todoList.complete = function (state) {
      todoList.todos.forEach(todo => {
        if (todo.state) return

        todo.completed = state
        todoList.save(todo)
      })
    }

    // Error message
    todoList.errorMessage = false

    // Error handler
    todoList.errorHandler = err => {
      todoList.errorMessage = err.data
      setTimeout(() => {
        todoList.errorMessage = false
      }, ERROR_MESSAGE_DURATION)
    }

    // Make name field editable
    todoList.editMode = todo => {
      todo.editing = true
    }

    /**
     * CRUD
     */

    // CREATE
    todoList.addTodo = () => {
      $http.post(`${API_BASE}/create/`, {
        name: todoList.todoText,
        completed: false
      })
        .then(res => {
          todoList.todos.push(res.data)
          todoList.todoText = ''
        })
        .catch(todoList.errorHandler)
    }

    // READ
    todoList.getItems = () => {
      // Load todos from API
      $http.get(`${API_BASE}/items/`)
        .then(res => {
          let todos = res.data

          // set editing to false by default
          // set visible to true by default
          todos.forEach(todo => {
            todo.editMode = false
            todo.visible = true
          })
          todoList.todos = todos;

          todoList.completed = function () {
            let completed = todoList.todos.filter(obj => {
              return obj.completed
            })
            return completed.length
          }
        })
        .catch(todoList.errorHandler)
    }

    // UPDATE
    todoList.save = todo => {
      $http.put(`${API_BASE}/item/${todo._id}`, todo)
        .then(res => {
          todo.editing = false
        })
        .catch(todoList.errorHandler)
    }

    // DELETE
    todoList.delete = todo => {
      $http.delete(`${API_BASE}/item/${todo._id}`)
        .then(res => {
          todoList.todos = todoList.todos.filter(obj => {
            return obj._id != res.data._id
          })
        })
        .catch(todoList.errorHandler)
    }

    // DELETE all completed
    todoList.deleteCompleted = () => {
      angular.forEach(todoList.todos, todo => {
        if (todo.completed) {
          todoList.delete(todo)
        }
      })
    }

    // Init
    todoList.getItems()
  })

  // Directive for auto-focus when editing mode enabled
  .directive('focusMe', $timeout => {
    return {
      scope: {trigger: '@focusMe'},
      link: (scope, element) => {
        scope.$watch('trigger', value => {
          if (value) {
            $timeout(() => {
              element[0].focus()
            })
          }
        })
      }
    }
  })

  // Directive for save name by Enter press
  .directive('enterMe', $timeout => {
    return (scope, element, attrs) => {
      element.bind('keydown, keypress', event => {
        if(event.which === 13){
          scope.$apply(function (){
            scope.$eval(attrs.enterMe);
          });
        }
      })
    }
  })