import React from 'react';
import { gql, useQuery } from '@apollo/client';

export default function FirstQuery({}) {
  const { data, error, loading } = useQuery(gql`query { hello }`, {
    variables: {},
  });

  if (error) return 'Error';
  if (loading) return 'Loading...';
  const { hello } = data || {};

  return (
    <div>
      {hello}
    </div>
  );
}
