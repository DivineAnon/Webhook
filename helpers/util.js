'use strict';

const randomstring = require('randomstring');
const moment = require('moment');

const util = {};

const create_UUID = () => {
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};


const generateNomor = (n) => {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generateNomor(max) + generateNomor(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  }
  return true;
};
/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  }

  return true;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isObjectEmpty = (input) => {

  if (input === undefined || input === '' || input == null || input === "null") {
    return true;
  } else if (input instanceof String) {
    if (input.trim().length === 0) {
      return true;
    }
  } else if (Object.keys(input).length === 0) {
    return true;
  }

  return false;
};

const addValueInObject = (object, key, value) => {
  let res = {};
  let textObject = JSON.stringify(object);
  if (textObject === '{}') {
    res = JSON.parse('{"' + key + '":"' + value + '"}');

  } else {
    res = JSON.parse('{' + textObject.substring(1, textObject.length - 1) + ',"' + key + '":"' + value + '"}');
  }
  return res;
}

function groupBy(objectArray, property) {

  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

}



util.isValidEmail = isValidEmail;
util.validatePassword = validatePassword;
util.isEmpty = isEmpty;
util.isObjectEmpty = isObjectEmpty;
util.create_UUID = create_UUID;
util.generateNomor = generateNomor;
util.generateNomor = generateNomor;
util.addValueInObject = addValueInObject;
util.groupBy = groupBy;



module.exports = util;
