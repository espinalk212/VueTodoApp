const app = {
  data() {
    return {
      todos: [],
      newTodo: {},
      user: localStorage.getItem("name"),
      isActiveModal: true,
    }
  },
  methods: {
    addTodo: function() {
      if(this.$refs["todoInput"].value === "") return;
      this.todos = [this.newTodo, ...this.todos]
      this.$refs["todoInput"].value = "";
      this.$refs["todoDueDate"].value = "";
    },
    update: function() {
      this.newTodo = { id:(Math.trunc(Math.random() * 1000)), task: (this.$refs["todoInput"].value).split(" ").map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase()).join(" "), completed:  false, date: (new Date(this.$refs["todoDueDate"].value)).toLocaleDateString() !== "Invalid Date" ? (new Date(this.$refs["todoDueDate"].value)).toDateString().slice(4) : (new Date().toDateString().slice(4))};
      console.log(this.newTodo)
    },
    markCompleted: function(id) {
      let newTodos = [];
      for(let i = 0; i < this.todos.length; i++) {
        let todo = this.todos[i];
        if (todo.id === id) {
          newTodos.push({
            id: todo.id,
            completed: true,
            task: todo.task,
          })
        } else {
          newTodos.push({
            id: todo.id,
            completed: todo.completed,
            task: todo.task,
            date: todo.date
          })
        }
      }
      return this.todos = newTodos
    },
    deleteTask: function(id) {
      let newTodos = [];
      for(let i = 0; i < this.todos.length; i++) {
        let todo = this.todos[i];
        if (todo.id === id) {
          continue;
        } else {
          newTodos.push({
            id: todo.id,
            completed: todo.completed,
            task: todo.task,
            date: todo.date
          })
        }
      }
      return this.todos = newTodos
    },
    // watch: {
    //   input: function () {
    //     if (isLocalStorage() /* function to detect if localstorage is supported*/) {
    //       localStorage.setItem('storedData', this.input)
    //     }
    //   }
    setLocalStorage: function() {
      localStorage.setItem("name",this.$refs["name"].value);
      this.isActiveModal = false;
    }
  }
}

Vue.createApp(app).mount("#app")


