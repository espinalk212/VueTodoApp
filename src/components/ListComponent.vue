<template>
  <div>
    <h1 v-if="user">{{user}}'s Todos</h1>
      <h1 v-else>My Todos</h1>
      <div v-if="modal" class="modal" >
        <div class="modalcontent">
          <button v-on:click="closeConsent" class="close">Close</button>
          <span>Hi, welcome! It looks like we don't know your name.
          Set a name so that we can give you a better experience.</span>
          <span>This app uses localStorage to provide you with a reliable
            way to store your name and tasks</span>
          <p><em><strong>By entering your name and pressing submit you are giving consent
            (if you do not wish to do so just use the close button in the corner)</strong></em></p>
          <Label for="name"></Label>
          <input
            type="text"
            placeholder="Your Name Here"
            ref="name"
            v-model="user"
          >
          <br>
          <button v-on:click="setLocalStorage">Submit</button>
        </div>
      </div>
      <h6>A simple yet effective Vue.js app that allows you track your tasks</h6>
      <div>
        <h2>
          {{ todos.length === 0 ? "You have no todos, let's start adding some" : "Todo List"
          }}
        </h2>
        <ul v-if="todos.length > 0">
          <li v-for="(todo, index) in todos" v-bind:key="index">
            <div class="task">
              <p>Task: {{ todo.task }}</p>
              <p>{{todo.completed ? 'Completion Date: ' : 'Due Date: '}} {{todo.date}}</p>
            </div>
            <div class="completedContainer">
              <label for="yes">
              <input
                class="markCompleted"
                type="button"
                value="Mark as Completed"
                v-on:click="markCompleted(todo.id)"
                v-if="todo.completed === false"
              />
            <div class="completed" v-if="todo.completed === true"> ✅ </div>
            <!-- <div class="editContainer">
              <label for="edit">
              <input
                class="editTask"
                type="button"
                value="Edit Task"
                v-on:click="editTask(todo.id)"
              /> -->
            </label>
            </div>
            <label for="deleteTask">
              <input
                class="markDeleted"
                type="button"
                value="Delete Task"
                v-on:click="deleteTask(todo.id)"
              />
              </label>
          </li>
        </ul>
      </div>
      <form v-on:submit.prevent>
        <label for="todoInput">
          <input
            class="todoInput"
            name="todoInput"
            type="text"
            placeholder="Add a todo"
            ref="todoInput"
            v-on:input="update"
          />
        <p>To be completed by:</p>
        </label>
        <label for="todoDueDate">
          <input
            class="todoDueDate"
            name="todoDueDate"
            type="datetime-local"
            ref="todoDueDate"
            v-on:input="update"
          />

        </label>
        <br>
        <p>This is optional (if date not set will default to current date)</p>
        <br />
        <button v-on:click="addTodo">Submit</button>
      </form>
      <br>
      <footer>
        <button v-on:click="clearApp">Clear my data</button>
      </footer>
 </div>
</template>

<script>
  export default {
    name: "ListComponent",
    data() {
      return {
        todos: [],
        newTodo: {},
        user: localStorage.getItem('name'),
        modal: localStorage.getItem('name') === null ? true : false,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      addTodo: function () {
        if (this.$refs['todoInput'].value === '') return;
        this.todos = [this.newTodo, ...this.todos];
        localStorage.setItem("todos", JSON.stringify(this.todos))
        this.$refs['todoInput'].value = '';
        this.$refs['todoDueDate'].value = '';
      },
      update: function () {
        this.newTodo = {
          id: Math.trunc(Math.random() * 1000),
          task: this.$refs['todoInput'].value
            .trim().split(' ')
            .map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
            .join(' '),
          completed: false,
          date:
            new Date(this.$refs['todoDueDate'].value).toLocaleDateString() !==
            'Invalid Date'
              ? new Date(this.$refs['todoDueDate'].value).toDateString().slice(4)
              : new Date().toDateString().slice(4),
        };
      },
      markCompleted: function (id) {
        let newTodos = [];
        for (let i = 0; i < this.todos.length; i++) {
          let todo = this.todos[i];
          if (todo.id === id) {
            newTodos.push({
              id: todo.id,
              completed: true,
              task: todo.task,
              date: new Date().toDateString().slice(4),
            });
          } else {
            newTodos.push({
              id: todo.id,
              completed: todo.completed,
              task: todo.task,
              date: todo.date,
            });
          }
        }
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return (this.todos = newTodos);
      },
      deleteTask: function (id) {
        let newTodos = [];
        for (let i = 0; i < this.todos.length; i++) {
          let todo = this.todos[i];
          if (todo.id === id) {
            continue;
          } else {
            newTodos.push({
              id: todo.id,
              completed: todo.completed,
              task: todo.task,
              date: todo.date,
            });
          }
        }
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return (this.todos = newTodos);
      },
      // editTask: function (id) {
      //   for(let i = 0; i < this.todos.length; i++) {
      //     if(this.todos[i].id === id) {
      //       this.$refs['todoInput'].value = this.todos[i].task;
      //     }
      //   }
      // },
      setLocalStorage: function () {
        if(this.user === "") return;
        localStorage.setItem('name', this.$refs['name'].value);
        this.closeModal();
      },
      getLocalStorage: function() {
        const username = localStorage.getItem('name');
        if(username === null) return;
        return username + "'s";
      },
      clearApp: function() {
        localStorage.clear();
        this.todos = [];
        this.user = "";
        this.modal = true;
      },
      closeModal: function() {
        this.modal = false;
      },
      closeConsent: function() {
        this.user = "";
        this.closeModal();
      },
      getData: function() {
        this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
      }
    },
  }

</script>

<style scoped>
form {
  border: 4px solid var(--secondary-color);
  padding: 5px;
  border-radius: 4px;
}

ul {
  border: 2px solid var(--secondary-color);
  background-color: var(--secondary-color);
  border-radius: 4px;
  color: var(--primary-color);
  list-style-position: inside
}

li {
  display: flex;
  border-bottom: 2px solid var(--tertiary-color);
  padding: 5px;
  justify-content: space-evenly;
  align-items:center;

}

.markCompleted {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);

}

.editTask {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);
}

.todoInput {
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);
  margin: 4px;
  height: 3vh;
  width: 80%;
}

.markDeleted {
  background-color: var(--secondary-color);
  color: red;
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);

}

h1 {
  border: 4px solid var(--secondary-color);
  padding: 5px;
  border-radius: 4px;
  color: white;
}

/* The Modal (background) */
.modal {
  /*display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,.8); /* Black w/ opacity */
}

/* Modal Content/Box */
.modalcontent {
  background-color: var(--primary-color);
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  /* color: var(--secondary-color); */
  float: right;
  /* font-size: 10px; */
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  text-decoration: none;
  cursor: pointer;
}


</style>