import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        postJob : builder.mutation({
            query:(data)=>({
                method:'POST',
                url : "/job",
                body: data,
            }),
            invalidatesTags:['jobs']
        }),
        apply: builder.mutation({
            query:(data)=>({
                method:'PATCH',
                url : "/apply",
                body: data,
            }),
        }),
        question: builder.mutation({
            query:(data)=>({
                method:'PATCH',
                url : "/query",
                body: data,
            }),
            invalidatesTags:['job']
        }),
        reply: builder.mutation({
            query:(data)=>({
                method:'PATCH',
                url : "/reply",
                body: data,
            }),
            invalidatesTags:['job']
           
        }),
        getJobs : builder.query({
            query:()=>({
                url : "/jobs",
                
            }),
            providesTages: ['jobs']
        }),
        getAppliedJobs : builder.query({
            query:(email)=>({
                url :`/applied-jobs/${email}`,
                
            }),
            
        }),
        jobById : builder.query({
            query:(id)=>({
                url :`/job/${id}`,
                
            }),
            providesTags:['job']

        })
    })
})

export const {usePostJobMutation,useGetJobsQuery,useJobByIdQuery,
    useApplyMutation,useGetAppliedJobsQuery,useQuestionMutation,useReplyMutation} = jobApi;