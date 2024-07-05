import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),

        // signup
        signup : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),

        //update profile
        updateProfile : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),
        
        signout : builder.mutation({
            query: () => ({
                url: `${USERS_URL}/signout`,
                method: 'POST',
            }),
        })
    }),
});

export const { 
    useSigninMutation,
    useSignoutMutation,
    useSignupMutation,
    useUpdateProfileMutation,
} = userApiSlice;