import gql from "graphql-tag";

// Query for displaying all blog posts

export const BLOGS_QUERY = gql`
  query {
    blogPosts {
      _id
      title
      description_short
      description
      image
      author
      likes {
        _id
        blogId
        userId
      }
    }
  }
`;

// Query for displaying all articles component
export const ARTICLES_QUERY = gql`
  query {
    componentArticles {
      _id
      code
      description
      quantity
      price
    }
  }
`;

// Query for displaying all users

export const USERS_QUERY = gql`
  query {
    users {
      _id
      first_name
      last_name
      email
      isAdmin
    }
  }
`;
// Query for displaying current logged user
export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      first_name
      last_name
      email
    }
  }
`;

export const DATA_USER_QUERY = gql`
  query($_id: ID!) {
    user(id: $_id) {
      first_name
      last_name
    }
  }
`;
