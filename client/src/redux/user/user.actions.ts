import { GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS, User, UserError } from "./user.types";

export const getUserStart = (id: string) =>({
  type: GET_USER_START,
  payload: id,
})

export const getUserSuccess = (user: User) => ({
  type: GET_USER_SUCCESS,
  payload: user,
})

export const getUserError = (error: UserError) => ({
  type: GET_USER_ERROR,
  payload: error,
})
