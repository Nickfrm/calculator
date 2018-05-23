<template>
  <div id="calculator">
    <div class="window"></div>
    <div class="buttons">
      <button>CE</button>
      <button>C</button>
      <button>
        <=</button>
          <button>%</button>
          <button class="number">7</button>
          <button class="number">8</button>
          <button class="number">9</button>
          <button>/</button>
          <button class="number">4</button>
          <button class="number">5</button>
          <button class="number">6</button>
          <button>*</button>
          <button class="number">1</button>
          <button class="number">2</button>
          <button class="number">3</button>
          <button>-</button>
          <button disabled>.</button>
          <button class="number">0</button>
          <button>=</button>
          <button>+</button>

    </div>
  </div>
</template>

<script>
export default {}
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
  .window {
    background: #fff;
    height: 50px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .buttons {
    display: grid;
    grid: 40px / repeat(4, 1fr);
    grid-auto-rows: 40px;
    gap: 4px;
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


