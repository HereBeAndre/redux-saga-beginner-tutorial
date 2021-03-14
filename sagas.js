import { all, put, takeEvery, call } from "redux-saga/effects";

export function* helloSaga() {
  console.log("Hello Saga!");
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// WORKER SAGA: it performs asynchronous increment task
export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

// WATCHER SAGA: spawn a new incrementAsync task on each INCREMENT_ASYNC action
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// export only rootSaga as entry point to start all other sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
