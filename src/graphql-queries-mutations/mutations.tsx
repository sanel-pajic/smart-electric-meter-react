import gql from "graphql-tag";

// Mutation for add new meter reading
export const ADD_METER_READING = gql`
  mutation($data: MeterReadingInput!) {
    addMeterReading(data: $data) {
      _id
      date
      initialMeterValue
      readingMeterValue
      consumptionElectricity
      networkFeeConsumption
      totalPrice
      author
    }
  }
`;

// Mutation for remove meter reading
export const REMOVE_METER_READING = gql`
  mutation($_id: ID!) {
    removeMeterReading(_id: $_id) {
      _id
    }
  }
`;

// Mutation for login
export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

// Mutation for update meter reading
export const UPDATE_METER_READING = gql`
  mutation($data: MeterReadingInput!) {
    updateMeterReading(data: $data) {
      _id
      date
      initialMeterValue
      readingMeterValue
      consumptionElectricity
      networkFeeConsumption
      totalPrice
      author
    }
  }
`;
