"use strict";
let errors = [];

function validation(){
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

validation.prototype.isEmail = (value, message) => {
  // const regex = new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i");
  // if (!regex.test(value)) {
  //   errors.push({ message: message });
  // }

  if (value < 6 ) {
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
