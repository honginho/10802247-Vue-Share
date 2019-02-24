var vm = new Vue({
    el: '#app',
    data: {
        cafeHistory: []
    },
    created: function () {
        createOldCafe(this.cafeHistory);
    },
    methods: {
        deleteItemSure(name, arr, id) {
            deleteCafeItemSure(name, arr, id);
        },
        recoverItem(name, arr, id) {
            recoverCafeItem(name, arr, id);
        },
        switchMode() {
            // switchListMode(this.component);
        }
    }
});
