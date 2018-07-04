import Vue from 'vue';
import router from '@/router';
import config from '@/libs/config';

const toLogin = () => {
  window.location.hash = '/login';
};
const fetchErrHandler = (err) => {
  if (err.code === 401) {
    toLogin();
  } else {
    alert(err.msg);
  }
};
const V = new Vue({
  router,
});
const getUser = () => {
  let user = null;
  try {
    user = JSON.parse(V.$cookie.get('user'));
  } catch (e) {
  }
  return user;
};
const getData = async (url, params = {}, errHandler = fetchErrHandler) => {
  const apiHost = config.getApiConfig().host;
  const user = getUser();
  if (user) params['access-token'] = `${user.address}@${user.token}`;
  const getUrlWithParams = (_url, params) => {
    const url = new URL(`${location.protocol}${_url}`);
    Object.keys(params).forEach(key => {
      let v = params[key];
      if (typeof v === 'object') {
        v = JSON.stringify(v);
      }
      url.searchParams.append(key, v);
    });
    return url;
  };
  const { success, data, err } = await (await fetch(getUrlWithParams(`${apiHost}${url}`, params))).json();
  if (success) {
    return data;
  } else {
    errHandler(err);
    return false;
  }
};
const postData = async (url, params = {}, errHandler = fetchErrHandler) => {
  const apiHost = config.getApiConfig().host;
  const user = getUser();
  if (user) params['access-token'] = `${user.address}@${user.token}`;
  const paramsToData = (params) => {
    const paramsList = [];
    Object.keys(params).forEach(key => {
      let v = params[key];
      if (typeof v === 'object') {
        v = JSON.stringify(v);
      }
      v = encodeURIComponent(v);
      paramsList.push(`${key}=${v}`);
    });
    return paramsList.join('&');
  };
  const { success, data, err } = await (await fetch(`${apiHost}${url}`, {
    method: 'post',
    body: paramsToData(params),
    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
  })).json();
  if (success) {
    return data;
  } else {
    errHandler(err);
    return false;
  }
};

export default {
  V,
  getUser,
  getData,
  postData,
};
