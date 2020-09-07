/* eslint-env browser */
import React, { useEffect, useRef, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Badge } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';

const queryDelayInitial = 100;
const queryDelayPolling = 5000;

export default function FirstQuery() {
  const timerRef = useRef(null);
  const [isPolling, setIsPolling] = useState(false);
  const [
    execQuery,
    { called, data, error, startPolling, stopPolling },
  ] = useLazyQuery(gql`query { notificationsCount }`, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      execQuery();
      setIsPolling(true);
    }, queryDelayInitial);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [execQuery, timerRef]);

  useEffect(() => {
    if (called) {
      if (isPolling) {
        startPolling(queryDelayPolling);
      } else {
        stopPolling();
      }
    }
  }, [called, isPolling, startPolling, stopPolling]);

  if (error) return 'Error';
  const { notificationsCount } = data || {};

  return (
    <p>
      <Badge color="secondary" badgeContent={notificationsCount || 0}>
        <MailIcon />
      </Badge>
    </p>
  );
}
