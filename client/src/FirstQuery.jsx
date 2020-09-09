/* eslint-env browser */
import React, { useEffect, useRef, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Badge } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';

const queryDelayInitial = 100;
const queryDelayPolling = 5000;

const notificationsQuery = gql`query { notificationsCount }`;
const notificationsMutation = gql`mutation { clearNotificationsCount }`;

export default function FirstQuery() {
  const timerRef = useRef(null);
  const [isPolling, setIsPolling] = useState(false);
  const [
    execQuery,
    { called, data, error, startPolling, stopPolling },
  ] = useLazyQuery(notificationsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  const [clearNotificationsCount, { loading }] = useMutation(notificationsMutation, {
    onCompleted: () => {
      startPolling(queryDelayPolling);
    },
    refetchQueries: [
      {
        query: notificationsQuery,
        variables: {},
      },
    ],
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
      <Badge color="secondary" badgeContent={loading ? '...' : (notificationsCount || 0)}>
        <MailIcon
          onClick={() => {
            setIsPolling(false);
            clearNotificationsCount();
          }}
        />
      </Badge>
    </p>
  );
}
