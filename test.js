
const { createApp, defineModel, ref } = Vue;

const app = createApp({
  components: {
    myTodos,
  },
  data() {
    return {
      loading: false,
      todos: [{ id: 1, text: 'sample', editing: false, v: 0 },
        { id: 2, text: 'item two', editing: false, v: 0 },],
    };
  },
  methods: {
    create: function() {
      // Create
    },
    read: function() {
      // Get data from the server
    },
    update: function() {
      // Create
    },
    delete: function() {
      //delete
    },
  },
  mounted() {
    console.log('Mounted');
  },
}).mount('#app');
