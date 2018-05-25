<template>
  <div id="calculator">
    <div class="window">
      <span :class="{muted:result!==''}">{{first}}{{sign}}{{second}}</span>
      {{result}}
    </div>
    <div class="buttons">
      <div class="memory">
        <button :class="{disabled:memory===null}" @click="clearMemory">MC</button>
        <button :class="{disabled:memory===null}" @click="recallMemory">MR</button>
        <button @click="changeMemory('+')">M+</button>
        <button @click="changeMemory('-')">M-</button>
        <button @click="storeMemory">MS</button>
        <button @click="showMemory">M &or;</button>
      </div>
      <button @click="clearAll()">C</button>
      <button @click="clearCurrent">CE</button>
      <button @click="clearNumber">&lt;=</button>
      <button v-for="s in signs" @click="addSign(s)" :key="s">{{s}}</button>
      <button v-for="n in numbers" @click="addNumber(n)" class="number" :key="n">{{n}}</button>
      <button class="disabled">.</button>
      <button @click="calcResult">=</button>
    </div>
    <div class="history" :class="{visible:isVisible}">
      <div v-for="h in history" :key="h">{{h}}</div>
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
      result: '',
      memory: null,
      isVisible: false,
      history: []
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
      if (this.result) {
        let first = this.result
        this.clearAll()
        this.firstNum = first
      }
      this.sign = sign
    },
    calcResult() {
      if (!this.secondNum) return
      let a = parseInt(this.firstNum)
      let b = parseInt(this.secondNum)
      switch (true) {
        case this.sign === '%':
          this.result = a / 100 * b
          break
        case this.sign === '+':
          this.result = a + b
          break
        case this.sign === '-':
          this.result = a - b
          break
        case this.sign === '*':
          this.result = a * b
          break
        case this.sign === '/':
          this.result = a / b
          break
      }
    },
    storeMemory() {
      if (this.result !== '') {
        this.memory = parseInt(this.result, 10)
      } else if (this.secondNum !== '') {
        this.memory = parseInt(this.secondNum, 10)
      } else {
        this.memory = parseInt(this.firstNum, 10)
      }
      this.history.push(this.memory)
    },
    recallMemory() {
      this.addNumber(this.memory)
    },
    clearMemory() {
      this.memory = null
      this.history = []
    },
    changeMemory(sign) {
      let current = this.memory
      this.storeMemory()
      if (sign === '+') {
        current += this.memory
        this.memory = current
      } else {
        current -= this.memory
        this.memory = current
      }
      this.history = this.history.slice(0, -2)
      this.history.push(this.memory)
    },
    showMemory() {
      this.isVisible = !this.isVisible
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
  position: relative;
  overflow: hidden;
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
      &.disabled {
        background: $bg-disabled;
        cursor: not-allowed;
      }
    }
  }
  .history {
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    background: #f7f7f7;
    position: absolute;
    right: 0;
    top: 160px;
    bottom: 0;
    padding: 20px;
    width: 100%;
    text-align: right;
    display: none;
    overflow: auto;
    &.visible {
      display: block;
    }
  }
}
</style>


