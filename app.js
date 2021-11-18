const app = {
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
};

Vue.createApp(app).mount('#app');
