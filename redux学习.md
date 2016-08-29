action: 规定动作以及数据
reducer: 如何更新action中的数据。接受旧的action、state,返回新的。(state)
store: 调用reducer更改action中的数据

定义action
action一般形式：
function addTodo(data) {
	return {
		type: type,							// type属性是必须的
		data: data							// 其他属性，任意定义，保存数据
	}
}

reducer一般形式：
function todos(state = [], action) {		// 参数state,action state给默认值
  switch (action.type) {								// 对action进行switch判断
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [

      ]
    default:
      return state
  }
}

// 通过redux提供的combineReducers方法将多个reducer结合
const todoApp = combineReducers({						
  visibilityFilter,
  todos
})
export default todoApp;

store通过redux提供的createStore方法传递reducer方法作为参数去创建。
let store = createStore(todoApp) // todoApp为reducer

react-redux的Provider组件通过store属性传递。
<Provider store={store}>
  <App />
</Provider>

组件中通过react-redux的connect方法，将store映射到props上。
function select(state) {
  return {
    visibleTodos: ...
    visibilityFilter: ... 
  };
}
export default connect(select)(App);  // App为组件名，select方法在connect中调用，会将store的getState()传递过去。te()值

组件中通过connect传递过来的props中的dispatch方法更改
const { dispatch } = this.props 	// this.props为调用connect后自动传递god了的的。
dispatch(completeTodo(index))			// dispatch调用某action

中间件

// 中间件由三个嵌套的函数构成（会依次调用）：
// 1) 第一层向其余两层提供分发函数和 getState 函数
//    （因为你的中间件或 action creator 可能需要从 state 中读取数据）
// 2) 第二层提供 next 函数，它允许你显式的将处理过的输入传递给下一个中间件或 Redux
//    （这样 Redux 才能调用所有 reducer)。
// 3) 第三层提供从上一个中间件或从 dispatch 传递来的 action，
//     这个 action 可以调用下一个中间件（让 action 继续流动) 或者
//     以想要的方式处理 action。

var thunkMiddleware = function ({ dispatch, getState }) {
  // console.log('Enter thunkMiddleware');
  return function(next) {
    // console.log('Function "next" provided:', next);
    return function (action) {
      // console.log('Handling action:', action);
      return typeof action === 'function' ?
          action(dispatch, getState) :
          next(action)
    }
  }
}

调用中间件
import { createStore, combineReducers, applyMiddleware } from 'redux'
const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)