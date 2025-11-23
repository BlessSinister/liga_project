import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'taskaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tasks-service-maks1394.amvera.io/' }),
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => 'tasks',
    }),
    AddTask: build.mutation({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
