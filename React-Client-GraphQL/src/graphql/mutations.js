import { gql } from '@apollo/client';

//* User
//#region
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const REGISTER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const UPDATE_CURRENT_USER = gql`
  mutation updateCurrentUser($user: UserInput!) {
    updateCurrentUser(user: $user)
  }
`;
//#endregion

//* Workout
//#region
export const CREATE_WORKOUT = gql`
  mutation createWorkout($workout: WorkoutInput!) {
    createWorkout(workout: $workout)
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($id: ID!, $workout: WorkoutInput!) {
    updateWorkout(id: $id, workout: $workout)
  }
`;

export const DELETE_WORKOUT = gql`
  mutation deleteWorkout($id: ID!) {
    deleteWorkout(id: $id)
  }
`;
//#endregion

//* Exercise
//#region
export const CREATE_EXERCISE = gql`
  mutation createExercise($exercise: ExerciseInput!) {
    createExercise(exercise: $exercise)
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation updateExercise($id: ID!, $exercise: ExerciseInput!) {
    updateExercise(id: $id, exercise: $exercise)
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(id: $id)
  }
`;
//#endregion
