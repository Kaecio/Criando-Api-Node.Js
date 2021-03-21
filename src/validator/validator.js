"use strict";
let errors = [];

const validation = () => {
  errors = [];
};

validation.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) {
    errors.push({ message: message });
  }
};

validation.prototype.hasMinlen = (value, min, message) => {
  if (!value || value.length <= min) {
    errors.push({ message: message });
  }
};

validation.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) {
    errors.push({ message: message });
  }
};

validation.prototype.isFixedLength = (value, length, message) => {
  if (value.length != length) {
    errors.push({ message: message });
  }
};

validation.prototype.isEmpty = (value, message) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!reg.test(value)) {
    errors.push({ message: message });
  }
};

validation.prototype.errors = () => {
  return errors;
};

validation.prototype.clear = () => {
  errors = [];
};

validation.prototype.isValid = () => {
  return errors.length == 0;
};

module.exports = validation;
