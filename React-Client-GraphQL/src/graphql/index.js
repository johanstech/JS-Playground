import { GET_CURRENT_USER, GET_WORKOUTS, GET_EXERCISES } from './queries';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_CURRENT_USER,
  CREATE_WORKOUT,
  UPDATE_WORKOUT,
  DELETE_WORKOUT,
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
} from './mutations';

export const queries = {
  getCurrentUser: GET_CURRENT_USER,
  getWorkouts: GET_WORKOUTS,
  getExercises: GET_EXERCISES,
};

export const userMutations = {
  login: LOGIN,
  logout: LOGOUT,
  register: REGISTER,
  updateCurrentUser: UPDATE_CURRENT_USER,
};

export const workoutMutations = {
  createWorkout: CREATE_WORKOUT,
  updateWorkout: UPDATE_WORKOUT,
  deleteWorkout: DELETE_WORKOUT,
};

export const exerciseMutations = {
  createExercise: CREATE_EXERCISE,
  updateExercise: UPDATE_EXERCISE,
  deleteExercise: DELETE_EXERCISE,
};
