/* eslint-env browser */
import React, { useEffect, useRef } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

export default function FirstQuery({}) {
  const timerRef = useRef(null);
  const [execQuery, { called, data, error, loading }] = useLazyQuery(gql`query { hello }`, {
    variables: {},
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      execQuery();
    }, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [execQuery, timerRef]);

  if (error) return 'Error';
  if (loading) return 'Loading...';
  const { hello } = data || {};

  return (
    <div>
      {called ? hello : 'waiting...'}
    </div>
  );
}
