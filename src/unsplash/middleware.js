import 'isomorphic-fetch';

import qs from 'qs';
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import parseLinkHeader from 'parse-link-header';

const base = 'https://api.unsplash.com';

const baseHeaders = new Headers();
baseHeaders.append('Content-type', 'application/json');

const call = (url, options = {}) => {
  const [path, queryString] = url.split('?');
  const query = qs.stringify({
    ...qs.parse(queryString),
    client_id: process.env.UNSPLASH_APP_ID
  });

  return fetch(`${base}${path}?${query}`, {
    ...options,
    headers: baseHeaders  
  });
};

export const CALL_UNSPLASH = 'CALL_UNSPLASH';

const getNextPageUrl = (response) => {
  const link = response.headers.get('link');

  if (!link) {
    return null;
  }

  const next = parseLinkHeader(link).next;
  return next ? next.url.replace(base, '') : null;
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

const request = (url, schema) => {
  return call(url)
    .then(checkStatus)
    .then(
      (response) => {
        return response.json().then(
          (json) => {
            const camelizedJson = camelizeKeys(json);
            const nextPageUrl = getNextPageUrl(response);

            return {
              ...normalize(camelizedJson, schema),
              nextPageUrl
            };
          },
          (error) => {
            return Promise.reject({
              status: 500,
              message: 'Unexpected server error'
            });
          }
        );
      },
      (response) => {
        if (response.headers.get('Content-Type') === 'application/json') {
          return response.json().then(
            (json) => {
              return Promise.reject({
                status: response.status,
                message: json.errors[0] || 'Unexpected request error'
              })
            },
            () => {
              return response.text().then((text) => {
                return Promise.reject({
                  status: response.status,
                  message: text
                });
              });
            }
          );
        } else {
          return response.text().then(
            (text) => Promise.reject({message: text}),
            () => Promise.reject({message: 'Unexpected server error'})
          );
        }
      }
    );
};

export default store => next => action => {
  const call = action[CALL_UNSPLASH];

  // not an api-calling action
  if (!call) {
    return next(action);
  }

  let url = call.url;
  const { schema, types, skipIf } = call;
  const [ requestType, successType, failureType ] = types;

  if (skipIf(store.getState())) {
    return Promise.resolve();
  }

  if (typeof url === 'function') {
    url = url(store.getState());
  }

  const actionWith = (data) => {
    const finalAction = {...action, ...data};
    delete finalAction[CALL_UNSPLASH];
    return finalAction;
  };

  next(actionWith({ type: requestType }));

  return request(url, schema)
    .then(
      (response) => {
        next(actionWith({
          type: successType,
          response
        }));

        return Promise.resolve(response);
      },
      (error) => {
        next(actionWith({
          type: failureType,
          error
        }));

        return Promise.reject(error);
      }
    );
};