import { get } from "http";
import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: `course/create`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: (data) => ({
        url: `course/edit/${data.courseId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCoursesUser: builder.query({
      query: () => ({
        url: `courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: `courses/admin`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `course/review/${data.courseId}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    replyReview: builder.mutation({
      query: (data) => ({
        url: `course/review/reply/${data.reviewId}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
        url: `course/question`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addAnswer: builder.mutation({
      query: (data) => ({
        url: `course/answer/${data.questionId}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `course/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useGetAllCoursesUserQuery,
  useGetCourseByIdQuery,
  useReplyReviewMutation,
  useDeleteCourseMutation,
} = courseApi;
