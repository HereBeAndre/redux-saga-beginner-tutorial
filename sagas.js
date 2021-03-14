import { all, put, takeEvery } from "redux-saga/effects";

export function* helloSaga() {
  console.log("Hello Saga!");
}

const delay = async (ms) => await ((res) => setTimeout(res, ms));

// WORKER SAGA: it performs asynchronous increment task
function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

// WATCHER SAGA: spawn a new incrementAsync task on each INCREMENT_ASYNC action
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// export only rootSaga as entry point to start all other sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), incrementAsync()]);
}
