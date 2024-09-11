// src/features/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from '../userSlice';
import { RootState } from '@/store/store';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState; // Explicitly type the getState function

            const token = selectToken(state); // Get the token from the Redux store
            if (token) {
                headers.set('jwt', token);
            }
            return headers;
        },
        credentials: 'include'

    }),

    endpoints: (builder) => ({
        //Events endpoints
        getEvents: builder.query<any, string>({ // change the return type 
            query: (status) => ({
                url: `event`,
                method: 'GET',
                params: { status: status }
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

        newAd: builder.mutation<any, any>({
            query: (data) => {
                console.log("data", data);
                return ({
                    url: `ads/`,
                    method: 'POST',
                    body: data
                })
            }
        }),
        updateEvent: builder.mutation<any, any>({
            query: (data) => {



                return ({
                    url: `event/${data.get('_id')}`,
                    method: 'PUT',
                    body: data
                })
            }
        }),
        updateEventStatus: builder.mutation<any, { _id: string, status: string }>({
            query: (data) => ({
                url: `event/status`,
                method: 'PUT',
                body: data
            })
        }),
        updateAdStatus: builder.mutation<any, { _id: string, status: string }>({
            query: (data) => {
                console.log(data);
                return ({
                    url: `ads/`,
                    method: 'PUT',
                    body: data
                })
            }
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

        searchEvents: builder.query<any, { searchTerm: string, stateName?: string }>({
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
        getUsers: builder.query<any, void>({
            query: (_id) => ({
                url: `auth/`,
                method: 'GET',
            })
        }),
        getUsersByPack: builder.query<any, any>({
            query: (pack) => ({
                url: `auth/`,
                method: 'GET',
                params: { pack }
            })
        }),
        updateUser: builder.mutation<any, { _id: string, formData: FormData }>({
            query: (data) => {
                console.log("apiSlice", data.formData.get("fullname"))
                return ({
                    url: `auth/${data._id}`,
                    method: 'PUT',
                    body: data.formData
                })
            }
        }),
        deleteUser: builder.mutation<any, string>({
            query: (selected) => ({
                url: `auth/delete`,
                method: 'DELETE',
                body: { ids: selected }
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
        validateSubscription: builder.mutation<any, any>({
            query: (selected) => {
                console.log("selected", selected)
                return ({
                    url: `organizer/validate`,
                    method: 'PUT',
                    body: { ids: selected }
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
        updatePack: builder.mutation<any, any>({
            query: (data) => {

                console.log(data)
                return ({
                    url: `organizer/pack/${data._id}`,
                    method: 'PUT',
                    body: { pack: data.pack, selected: data.ids }
                })
            }
        }),
        suspendUser: builder.mutation<any, string>({
            query: (selected) => {

                console.log(selected)
                return ({
                    url: `auth/suspend/`,
                    method: 'PUT',
                    body: { ids: selected }
                })
            }
        }),
        getSubscriptions: builder.query<any, any>({
            query: (pack) => {

                return ({
                    url: `organizer/multi/${pack}`,
                    method: 'GET',
                })
            }
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
                url: `ads/hero`,
                method: 'GET',
            })
        }),
        addOneMonth: builder.mutation<any, void>({
            query: (_id) => {

                console.log('running', _id)
                return ({
                    url: `ads/addmonth/${_id}`,
                    method: 'PUT',
                })
            }
        }),
        getSearchPageAdds: builder.query<any, void>({
            query: () => ({
                url: `ads/search`,
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
        getCategories: builder.query<any, void>({
            query: () => ({
                url: `category`,
                method: 'GET',
            })
        }),
        deleteCategory: builder.mutation<any, any>({
            query: (selected) => ({
                url: `category`,
                method: 'DELETE',
                body: { ids: selected }
            })
        }),
        addCategory: builder.mutation<any, string>({
            query: (name) => ({
                url: `category`,
                method: 'POST',
                body: { name }
            })
        }),
        getTypes: builder.query<any, void>({
            query: () => ({
                url: `type`,
                method: 'GET',
            })
        }),
        deleteTypes: builder.mutation<any, any>({
            query: (selected) => ({
                url: `type`,
                method: 'DELETE',
                body: { ids: selected }
            })
        }),
        addType: builder.mutation<any, string>({
            query: (name) => ({
                url: `type`,
                method: 'POST',
                body: { name }
            })
        }),

    }),
});

export const {
    useGetEventsQuery,
    useGetCategoriesQuery,
    useGetTypesQuery,
    useDeleteTypesMutation,
    useAddTypeMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useCreateEventMutation,
    useDeleteEventMutation,
    useGetEventQuery,
    useUpdateEventMutation,
    useRegisterUserMutation,
    useAddSubscriptionMutation,
    useLoginUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useGetSubscriptionQuery,
    useAddEventMutation,
    useGetHeroAddsQuery,
    useGetSearchPageAddsQuery,
    useGetEventAddQuery,
    useSearchEventsQuery,
    useSuspendUserMutation,
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
    useUpdateForgotPasswordMutation,
    useGetUsersByPackQuery,
    useUpdateEventStatusMutation,
    useUpdateAdStatusMutation,
    useNewAdMutation,
    useAddOneMonthMutation,
    useGetSubscriptionsQuery,
    useGetUsersQuery,
    useUpdatePackMutation,
    useValidateSubscriptionMutation

} = apiSlice;