import Vue from 'vue'
import Router from 'vue-router'

function page(name) {
  try {
    return require(`@/pages/${name}`).default
  } catch (e) {
    console.warn(`cant find page '${name}'`)
    return require(`@/pages/base-default`).default
  }
}

function route(path, component, meta = {}, children = []) {
  return {
    path: path,
    component: component,
    meta: meta,
    children: children
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    route('/', page('index'))
  ]
})
