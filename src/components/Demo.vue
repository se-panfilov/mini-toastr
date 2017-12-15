<template>
  <section>
    <h3>Demo</h3>
    <div>
      <label>Title
        <input type="text" v-model="title"/>
      </label>
    </div>
    <div>
      <label>Message text
        <input type="text" v-model="text"/>
      </label>
    </div>
    <ul class="showcase__types-items showcase-types">
      <li v-for="(value, key) in types"
          class="showcase-types__item"
          @change="setCurrentType(key)">
        <label>
          <input type="radio" :checked="type === value" :value="key" name="type"/>
          <span v-text="value"></span>
        </label>

      </li>
    </ul>
    <div>
      <label>
        <input type="checkbox" v-model="isShowIcon" value="true"/>
        <span>show icons?</span>
      </label>
    </div>
    <div>
      <input type="text" v-model="delay"/>
    </div>
    <div>
      <button type="button" @click="showToast()">Message!</button>
    </div>
  </section>
</template>

<script>
  import miniToastr from 'mini-toastr'

  miniToastr.init()

  const TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
  }
  export default {
    name: 'Demo',
    data () {
      return {
        title: 'Hey',
        text: 'Your message',
        delay: 3000,
        types: TYPE,
        type: TYPE.SUCCESS,
        isShowIcon: true
      }
    },
    methods: {
      showToast () {
        console.info(2123)
        miniToastr[this.type](this.text, this.title, this.delay)
      },
      setCurrentType (key) {
        this.type = this.types[key]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .showcase__types-items {
    /*text-align: left;*/
  }

  .showcase-types__item {
    display: block;
  }
</style>
