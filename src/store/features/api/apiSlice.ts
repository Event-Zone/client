// src/features/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),

    endpoints: (builder) => ({
        //Events endpoints
        getEvents: builder.query<any, void>({ // change the return type 
            query: () => ({
                url: `event`,
                method: 'GET'
            })
        }),
        getEvent: builder.query<any, string>({
            query: (_id) => ({
                url: `event/${_id}`,
                method: 'GET'
            })
        }),
        updateEvent: builder.mutation<any, any>({
            query: (data) => ({
                url: `event/${data._id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteEvent: builder.mutation<any, any>({
            query: (_id) => ({
                url: `event/${_id}`,
                method: 'DELETE',
            })
        }),
        createEvent: builder.mutation<any, any>({
            query: (data) => ({
                url: `event/`,
                method: 'POST',
                body: data
            })
        }),

    }),
});

export const {
    useGetEventsQuery,
    useCreateEventMutation,
    useDeleteEventMutation,
    useGetEventQuery,
    useUpdateEventMutation
} = apiSlice;