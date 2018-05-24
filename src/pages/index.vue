<template>
  <div id="calculator">
    <div class="window">
      <span :class="{muted:result!==''}">{{first}}{{sign}}{{second}}</span>
      {{result}}
    </div>
    <div class="buttons">
      <div class="memory">
        <button>MC</button>
        <button>MR</button>
        <button>M+</button>
        <button>M-</button>
        <button>MS</button>
      </div>
      <button @click="clearAll()">C</button>
      <button @click="clearCurrent">CE</button>
      <button @click="clearNumber">&lt;=</button>
      <button v-for="s in signs" @click="addSign(s)" :key="s">{{s}}</button>
      <button v-for="n in numbers" @click="addNumber(n)" class="number" :key="n">{{n}}</button>
      <!-- <button disabled>.</button> -->
      <button @click="calcResult">=</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      signs: ['%', '*', '/', '+', '-'],
      firstNum: '0',
      secondNum: '',
      sign: '',
      result: ''
    }
  },
  methods: {
    addNumber(num) {
      if (this.result) this.clearAll()
      if (this.sign) {
        this.secondNum += num
      } else {
        this.firstNum += num
      }
    },
    clearNumber() {
      if (this.result) this.clearAll()
      if (this.secondNum) {
        this.secondNum = this.secondNum.slice(0, -1)
      } else if (this.sign) {
        this.sign = ''
      } else {
        this.firstNum = this.firstNum.slice(0, -1)
      }
    },
    clearAll() {
      this.sign = ''
      this.result = ''
      this.secondNum = ''
      this.firstNum = '0'
    },
    clearCurrent() {
      if (this.result) return
      if (this.secondNum) {
        this.secondNum = ''
      } else {
        this.firstNum = '0'
        this.sign = ''
      }
    },
    addSign(sign) {
      this.sign = sign
    },
    calcResult() {
      if (!this.secondNum) return
      let a = parseInt(this.firstNum)
      let b = parseInt(this.secondNum)
      if (this.sign === '%') {
        this.result = a / 100 * b
      } else if (this.sign === '+') {
        this.result = a + b
      } else if (this.sign === '-') {
        this.result = a - b
      } else if (this.sign === '*') {
        this.result = a * b
      } else {
        this.result = a / b
      }
    }
  },
  computed: {
    second() {
      return this.secondNum ? parseInt(this.secondNum) : ''
    },
    first() {
      return parseInt(this.firstNum)
    }
  }
}
</script>

<style lang="scss">
$bg-grey: #e8e8e8;
$bg-symbols: #f2f2f2;
$bg-numbers: #fafafa;
$bg-disabled: #e3e3e3;
#calculator {
  background: $bg-grey;
  margin: 60px auto;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .window {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    text-align: right;
    font-size: 30px;
    span.muted {
      font-size: 14px;
      color: #ccc;
      display: block;
    }
  }
  .buttons {
    display: grid;
    grid: 40px / repeat(4, 1fr);
    grid-auto-rows: 40px;
    gap: 4px;
    .memory {
      grid-column: 1/-1;
      align-self: center;
    }
    button {
      background: $bg-symbols;
      border: 1px solid #ccc;
      &:focus {
        outline: none;
      }
      &.number {
        background: $bg-numbers;
      }
      &:hover {
        background: #fff;
      }
      &:disabled {
        background: $bg-disabled;
        cursor: not-allowed;
      }
    }
  }
}
</style>


