import {createStore,applyMiddleware,compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createWrapper} from 'next-redux-wrapper'
import rootReducer from './reducers/auth'

const middleware = [thunk]

const makeStore = ()=>createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)