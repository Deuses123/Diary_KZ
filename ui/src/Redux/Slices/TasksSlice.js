import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [{}]
};

const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {
        setTeamUsers(state, action) {
            state.users = action.payload;
        },

    },
});

export const { setTeamUsers } = TasksSlice.actions;
export default TasksSlice.reducer;
