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
        getEventAdd: builder.query<any, string[]>({
            query: (idsarr) => ({
                url: `event/multi`,
                method: 'GET',
                params: { ids: idsarr.join(',') }
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

        searchEvents: builder.query<any, string>({
            query: (eventName) => ({
                url: `event/search`,
                method: 'GET',
                params: { eventName }
            })
        }),
        searchEventsByLocation: builder.query<any, string>({
            query: (location) => ({
                url: `event/search/location`,
                method: 'GET',
                params: { state: location }
            })
        }),
        searchEventsByMonth: builder.query<any, any>({
            query: (data) => ({
                url: `event/search/month`,
                method: 'GET',
                params: data
            })
        }),
        searchEventsByDateRange: builder.query<any, any>({
            query: (data) => ({
                url: `event/search/daterange`,
                method: 'GET',
                params: data
            })
        }),
        searchEventsByType: builder.query<any, string>({
            query: (type) => ({
                url: `event/search/type`,
                method: 'GET',
                params: { type }
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
        //Event
        addEvent: builder.mutation<any, any>({
            query: (data) => ({
                url: `event/`,
                method: 'POST',
                body: data
            })

        }),

        // adds
        getHeroAdds: builder.query<any, void>({
            query: () => ({
                url: `adds/hero`,
                method: 'GET',
            })
        }),
        getSearchPageAdds: builder.query<any, void>({
            query: () => ({
                url: `adds/search`,
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
    useGetSubscriptionQuery,
    useAddEventMutation,
    useGetHeroAddsQuery,
    useGetSearchPageAddsQuery,
    useGetEventAddQuery,
    useSearchEventsQuery,
    useSearchEventsByLocationQuery,
    useSearchEventsByMonthQuery,
    useSearchEventsByDateRangeQuery,
    useSearchEventsByTypeQuery,
} = apiSlice;