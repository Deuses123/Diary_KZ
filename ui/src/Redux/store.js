import {configureStore} from "@reduxjs/toolkit";
import TasksSlice from "./Slices/TasksSlice.js";

const store = configureStore({
   reducer: {
      TasksSlice,
   }
});

export default store;
