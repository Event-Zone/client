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
                url: `event/${data.get('_id')}`,
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

        searchEvents: builder.query<any, { searchTerm: string, stateName: string }>({
            query: (eventQuery) => ({
                url: `event/search`,
                method: 'GET',
                params: { searchTerm: eventQuery.searchTerm, state: eventQuery.stateName }
            })
        }),
        searchEventsByLocation: builder.query<any, string[]>({
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
        searchEventsByType: builder.query<any, string[]>({
            query: (type) => ({
                url: `event/search/type`,
                method: 'GET',
                params: { type }
            })
        }),
        searchEventsByUser: builder.query<any, string>({
            query: (id) => ({
                url: `event/search/user/${id}`,
                method: 'GET',

            })
        }),
        searchEventsByCategorie: builder.query<any, string[]>({
            query: (categorie) => ({
                url: `event/search/categorie`,
                method: 'GET',
                params: { categorie }
            })
        }),
        searchEventsLocations: builder.query<any, void>({
            query: () => ({
                url: `event/search/locations`,
                method: 'GET',
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
        updateUser: builder.mutation<any, { _id: string, formData: FormData }>({
            query: (data) => ({
                url: `auth/${data._id}`,
                method: 'PUT',
                body: data.formData
            })
        }),
        updateUserPassword: builder.mutation<any, { _id: string, newPassword: string, oldPassword: string }>({
            query: (data) => ({
                url: `auth/editpassword/${data._id}`,
                method: 'PUT',
                body: data
            })
        }),
        updateForgotPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `auth/verify-code/editPassword`,
                method: 'PUT',
                body: data
            })
        }),
        forgotPassword: builder.mutation<any, string>({
            query: (email) => {

                console.log("EMAILLL", email)
                return ({
                    url: `auth/forgotpassword`,
                    method: 'PUT',
                    body: { email }
                })
            }
        }),

        //organiser
        addSubscription: builder.mutation<any, any>({
            query: (data) => ({
                url: `organizer/${data._id}`,
                method: 'POST',
                body: data
            })
        }),
        updateSubscription: builder.mutation<any, { _id: string, formData: FormData }>({
            query: (data) => {
                console.log("data.get('_id')", data.formData.get('company'))
                return ({
                    url: `organizer/${data._id}`,
                    method: 'PUT',
                    body: data.formData
                })
            }
        }),
        addVisitore: builder.mutation<any, any>({
            query: (data) => ({

                url: `auth/explore/${data._id}`,
                method: 'POST',
                body: data.formData
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
        googleLogin: builder.mutation<any, any>({
            query: (token) => ({
                url: `auth/google-login`,
                method: 'POST',
                body: token
            })
        }),
        sendA2F: builder.mutation<any, any>({
            query: (data) => ({
                url: `auth/verify-code`,
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
    useSearchEventsLocationsQuery,
    useSearchEventsByCategorieQuery,
    useUpdateUserMutation,
    useUpdateSubscriptionMutation,
    useAddVisitoreMutation,
    useGoogleLoginMutation,
    useSendA2FMutation,
    useSearchEventsByUserQuery,
    useUpdateUserPasswordMutation,
    useForgotPasswordMutation,
    useUpdateForgotPasswordMutation

} = apiSlice;