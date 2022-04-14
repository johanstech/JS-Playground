import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      _id
      email
      name
      gender
      height
      weight
      unit
    }
  }
`;

export const GET_WORKOUTS = gql`
  query {
    getWorkouts {
      _id
      userId
      unit
      date
      elapsedTime
      bodySections
      bodyParts
      exercises {
        name
        bodySections
        bodyParts
        sets {
          weight
          repetitions
        }
      }
    }
  }
`;

export const GET_EXERCISES = gql`
  query getExercises($bodySection: String, $bodyPart: String) {
    getExercises(bodySection: $bodySection, bodyPart: $bodyPart) {
      _id
      name
      description
      bodySections
      bodyParts
    }
  }
`;
