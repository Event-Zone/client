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

        //Auth
        registerUser: builder.mutation<any, any>({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data
            })
        }),
        loginUser: builder.mutation<any, any>({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data
            })
        }),

        getUser: builder.query<any, any>({
            query: (_id) => ({
                url: `auth/${_id}`,
                method: 'GET',
            })
        }),

        //organiser
        addSubscription: builder.mutation<any, any>({
            query: (data) => ({
                url: `organizer/${data._id}`,
                method: 'POST',
                body: data
            })
        }),
        getSubscription: builder.query<any, any>({
            query: (_id) => ({
                url: `organizer/${_id}`,
                method: 'GET',
            })
        }),


    }),
});

export const {
    useGetEventsQuery,
    useCreateEventMutation,
    useDeleteEventMutation,
    useGetEventQuery,
    useUpdateEventMutation,
    useRegisterUserMutation,
    useAddSubscriptionMutation,
    useLoginUserMutation,
    useGetUserQuery,
    useGetSubscriptionQuery
} = apiSlice;