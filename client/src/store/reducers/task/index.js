import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestWithToken } from "@/config/axios";

const initialState = {
  isLoading: false,
  task: null,
  tasks: [],
  success: null,
  error: null,
};

export const STATE_KEY = "task";

const taskSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    // creating task
    requestCreate(state) {
      state.isLoading = true;
    },
    requestCreateSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.response.message;
      state.task = action.payload.response;
    },
    requestCreateFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.response.message;
    },

    // updating task
    requestUpdate(state) {
      state.isLoading = true;
    },
    requestUpdateSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.response.message;
      state.task = action.payload.response;
    },
    requestUpdateFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.response.message;
    },

    // fetching all the tasks
    requestTasks(state) {
      state.isLoading = true;
    },
    requestTasksSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.response.message;
      state.tasks = action.payload.response;
    },
    requestTasksFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.response.message;
    },

    // delete task
    requestDelete(state) {
      state.isLoading = true;
    },
    requestDeleteSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.response.message;
      state.task = action.payload.response;
    },
    requestDeleteFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.response.message;
    },

    clearTask(state) {
      state.task = null;
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  requestCreate,
  requestCreateFailed,
  requestCreateSuccess,

  requestUpdate,
  requestUpdateFailed,
  requestUpdateSuccess,

  requestTasks,
  requestTasksFailed,
  requestTasksSuccess,

  requestDelete,
  requestDeleteFailed,
  requestDeleteSuccess,

  clearTask,
} = taskSlice.actions;

export const createTask = (data) => (dispatch) => {
  dispatch(requestCreate());
  fetchRequestWithToken({
    url: `/api/create`,
    method: "POST",
    data,
  })(requestCreateSuccess)(requestCreateFailed)(dispatch);
};

export const updateTask = (data, id) => (dispatch) => {
  dispatch(requestUpdate());
  fetchRequestWithToken({
    url: `api/update/${id}`,
    method: "PUT",
    data,
  })(requestUpdateSuccess)(requestUpdateFailed)(dispatch);
};

export const getTasks = () => (dispatch) => {
  dispatch(requestTasks());
  fetchRequestWithToken({
    url: `api/tasks`,
    method: "GET",
  })(requestTasksSuccess)(requestTasksFailed)(dispatch);
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(requestDelete());
  fetchRequestWithToken({
    url: `api/delete/${id}`,
    method: "DELETE",
  })(requestDeleteSuccess)(requestDeleteFailed)(dispatch);
};

export const taskSelector = (state) => state[STATE_KEY];

export default taskSlice.reducer;
