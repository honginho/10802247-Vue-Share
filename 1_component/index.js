Vue.component('new-cafe', {
    data: function () {
        return {
            addForm: {
                name: '',
                city: ''
            },
            cafe: []
        }
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
        }
    },
    template: `
        <div>
            <form>
                <input type="text" name="name" placeholder="Cafe name" v-model="addForm.name">
                <input type="text" name="city" placeholder="Cafe city" v-model="addForm.city">
                <input type="button" value="Switch Mode" v-on:click="$emit(\'switch-mode\')">
                <input type="button" value="Add Cafe" @click="addItem">
            </form>

            <div class="description">
                Saving data: { name: <a>{{addForm.name}}</a> , city: <a>{{addForm.city}}</a> }
            </div>

            <ul>
                <li v-for="(item, index) in cafe">
                    <span>{{item.name}}</span>
                    <span>{{item.city}}</span>
                    <div v-on:click="deleteItem(item.name, cafe, index)">Delete</div>
                </li>
            </ul>
        </div>
    `
});

Vue.component('old-cafe', {
    data: function () {
        return {
            cafeHistory: []
        }
    },
    created: function () {
        createOldCafe(this.cafeHistory);
    },
    methods: {
        recoverItem(name, arr, id) {
            recoverCafeItem(name, arr, id);
        },
        deleteItemSure(name, arr, id) {
            deleteCafeItemSure(name, arr, id);
        }
    },
    template: `
        <div>
            <form>
                <input type="button" value="Switch Mode" v-on:click="$emit(\'switch-mode\')">
            </form>

            <div class="description">
                History:
            </div>

            <ul>
                <li v-for="(item, index) in cafeHistory">
                    <span>{{item.name}}</span>
                    <span>{{item.city}}</span>
                    <div v-on:click="deleteItemSure(item.name, cafeHistory, index)">Delete</div>
                    <div v-on:click="recoverItem(item.name, cafeHistory, index)">Recover</div>
                </li>
            </ul>
        </div>
    `
});

var vm = new Vue({
    el: '#app',
    data: {
        component: 'new-cafe'
    },
    created: function () {
        createNewCafe(this.cafe);
    },
    methods: {
        switchMode() {
            this.component = (this.component === 'new-cafe') ? 'old-cafe' : 'new-cafe';
        }
    }
});
