# 10802247-Vue-Share
參考：
1. Vue.js 官方文檔 [英文](https://vuejs.org/v2/guide/) [簡體中文](https://cn.vuejs.org/v2/guide/)
2. [Summer。桑莫。夏天](https://cythilya.github.io/)

## 4 模組化(Components)
在`Vue`裡，每個模組是一個擁有預定義選項的一個`Vue`實例。在`Vue`中註冊模組很簡單：
```javascript
// 註冊一個叫做 todo-item 的新模組
Vue.component('todo-item', {
  template: '<li>這是一個待辦事項。</li>'
});
```

然後就可以把它建構在另一個模組模板上：
```html
<ol>
  <!-- 創建一個 todo-item 模組的實例 -->
  <todo-item></todo-item>
</ol>
```

但是這樣會發生一種情況：每個渲染出來的待辦事項都一樣。

???這似乎不太優，所以要有個我們應該能從父作用域將數據傳到子模組才對。讓我們來修改一下組件的定義，使之能夠接受一個prop：
```javascript
Vue.component('todo-item', {
  // todo-item 模組現在接受一個 'prop'，
  // 它就像是自己定義出來的屬性，
  // 我們把這個 prop 取做 todo
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});
```

這時候就要使用`v-bind`來把待辦事項和`todo-item`模組綁定，才能讓父模組把資料傳給每個子模組：
```html
<div id="app-7">
  <ol>
    <!--
      我們為每個 todo-item 提供 todo 對象
      todo 的對象是變量，換言之，它的內容是可以動態改變的。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

var vm = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '牛肉湯' },
      { id: 1, text: '肉燥飯' },
      { id: 2, text: '陽春麵' }
    ]
  }
});
```

由於效能考量，在預設的狀況下，`Vue`會儘量重覆使用已經渲染好的元素。若不設定`key`值，不會重新渲染元素，只會部份更新。

> 在初始畫面中，使用者分別在每個輸入框中輸入文字。當元素的順序改變後，雖然元素被更新，但使用者的輸入會被保留，這是因為元素並沒有被重新渲染，而只是部份更新而已。每個`<li>`都使用`v-bind`綁定一個屬性`key`並設定唯一值，目的是要確保每個元素的唯一性。當元素更新時，例如改變順序，有可識別唯一性的`key`來確保我們有正確地重新渲染。

#### 模組之間的溝通
![](https://cdn-images-1.medium.com/max/800/0*Xzkw0-T4Uea3d5Yh.png)

[圖片來源](https://medium.com/@sky790312/about-vue-2-parent-to-child-props-af3b5bb59829)

<br>

在一個大型網站和應用程式中，是有必要把整個應用程序劃分為好多個模組，以使開發過程中更容易管理，完成之後更容易維護。

> E.g.
```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

## 3 使用者輸入
為了讓使用者和網站或應用程式互動，可以用`v-on`指令添加一個事件監聽器(Event listener)，通過它調用在`Vue`實例中定義的方法(Methods)：
```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">文字反轉</button>
</div>
```

```javascript
// JavaScript
var vm = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

#### 注意
在`reverseMessage()`方法中，我們更新了前端的資訊，但沒有動到`DOM`節點，所有的`DOM`操作都由`Vue`來處理，我們在 coding 的時候只需要關注邏輯層面就好了。

`Vue`還提供了`v-model`指令，它能輕鬆實現表單輸入和應用狀態之間的雙向綁定，超級方便：
```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```javascript
// JavaScript
var vm = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
});
```

在輸入框輸入文字，會同時顯示在頁面上面，我覺得神奇。

> 實際上，`v-model`是`v-bind`和`v-on`配合使用的[語法糖](https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%B3%95%E7%B3%96)。

> 下面這兩行程式碼呈現出來的結果是一樣的。
```html
<input v-model="value" />
<input v-bind:value="value" v-on:input="value= $event.target.value" />
```

## 2 條件與循環(`if`, `for`)
用`v-if`指令切換一個元素要不要顯示，超級簡單：
```html
<div id="app-3">
  <p v-if="seen">
    現在你看到我了呢。
  </p>
</div>
```

```javascript
// JavaScript
var vm = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});
```

> 打開瀏覽器的DevTools的console，輸入`vm.seen = false;`，就會發現之前顯示的消息消失了。

實作這個例子後會發現不僅可以把資料綁定到`DOM`的屬性，還可以綁定到`DOM`結構。

此外，`Vue`也提供強大的[過渡效果](https://vuejs.org/v2/guide/transitions.html)，可以在`Vue`插入/更新/移除元素時自動應用。

用`v-for`指令綁定陣列的資料來渲染一個項目列表：
```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```javascript
// JavaScript
var vm = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '學HTML' },
      { text: '學CSS' },
      { text: '學JavaScript' },
      { text: '學PHP' }
    ]
  }
});
```

`v-for`的做法就像是我們熟知的`forEach`一樣。

> 打開瀏覽器的DevTools的console，輸入`vm.todos.push({ text: '學不完' });`，就會發現列表最後添加了一個新項目。

## 1 聲明式渲染(Declarative Rendering)
`Vue.js`的其中一個核心是允許我們用簡單的模板語法來聲明式地將資料渲染到`DOM`節點上：

```html
<!-- HTML -->
<div id="app">
  {{ message }}
</div>
```

```javascript
// JavaScript
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue !'
  }
});
```

就這樣，對，就這樣而已。現在資料和`DOM`已經被綁定了，所有東西都是響應式的。

> 怎麼說？打開瀏覽器的DevTools的console(F12 / ctrl+alt+I / option+command+I)，輸入`vm.message = 'Vue Easy la !';`，就會看到頁面的內容從`Hello Vue !`變成`Vue Easy la !`了。

<br>

除了內文之外，還可以像這樣來綁定元素屬性(Attribute)：

```html
<!-- HTML -->
<div id="app-2">
  <span v-bind:title="message">
    滑鼠移上來以查看提示訊息喔。
  </span>
</div>
```

```javascript
// JavaScript
var vm2 = new Vue({
  el: '#app-2',
  data: {
    message: '提示訊息'
  }
});
```

這裡看到了`v-bind`稱為Directive(譯作『指令』)，帶有前綴`v-`的指令表示它們是`Vue.js`提供的特殊屬性。它們會在渲染的`DOM`上應用特殊的響應式行為。

> 翻譯成中文：把這個元素節點的`title`屬性和`Vue`實例的`message`屬性保持一致。

> 同樣，打開瀏覽器的DevTools的console，輸入`vm2.message = '新提示訊息';`，就會看到這個綁定了`title`屬性的`DOM`節點已經更新了。

## `Vue.js`兩大核心
### 1. 資料驅動(Data-driven)
資料的改變驅動畫面的自動更新，傳統的做法得手動改變`DOM`來改變，用`Vue.js`只需要改變資料，就會自動改變。再也不用去操心`DOM`的更新了，這就是MVVM思想的實現。
![](https://vuejs.org/images/mvvm.png)

### 2. 模組化(Components)，又譯作『組件化』
把整一個網頁的拆分成一個又一個區塊，每個區塊我們可以看作成一個元件。網頁由多個元件拼接或巢狀組成。如下圖：
![](https://cn.vuejs.org/images/components.png)

## `Vue.js`生命週期圖(Lifecycle Diagram)
![](https://vuejs.org/images/lifecycle.png)

## 0 起步
跟`jQuery`一樣方便，創建一個`HTML`檔，引入`Vue.js`的CDN：

```html
<!-- 開發環境版本，執行程式的時候就像是用嚴格模式一樣，Vue.js會在console顯示出有幫助的提示或警告。 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
或是
```html
<!-- 生產環境版本，優化速度和空間。 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

這是使用`Vue.js`最快最簡單的方式。

> 有一種`Vue.js`的開發工具：`Vue CLI`，但是不推薦`Vue.js`新手使用。
