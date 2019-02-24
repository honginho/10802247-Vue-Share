var vm = new Vue({
    el: '#app',
    data: {
        addForm: {
            name: '',
            city: ''
        },
        cafe: []
    },
    created: function () {
        createNewCafe(this.cafe);
    },
    methods: {
        addItem() {
            addCafeItem(this.addForm, this.cafe);
        },
        deleteItem(name, arr, id) {
            deleteCafeItem(name, arr, id);
        },
        switchMode() {
            // switchListMode(this.component);
        }
    }
});
