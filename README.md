# 10802247-Vue-Share
參考：Vue.js 官方文檔 [英文](https://vuejs.org/v2/guide/) [簡體中文](https://cn.vuejs.org/v2/guide/)

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

**注意** 在`reverseMessage()`方法中，我們更新了前端的資訊，但沒有動到`DOM`節點，所有的`DOM`操作都由`Vue`來處理，我們在 coding 的時候只需要關注邏輯層面就好了。

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

## 什麼是Vue.js？

## 為什麼是Vue.js？

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

### 1. Download this repository
```
git clone https://github.com/framework7io/framework7-template-vue-webpack my-app
```
