function allSpace(data = "") {
  let spaces = 0;
  for (let i = 0; i < data.length; i++) {
    const result = /\s/g.test(data[i]);
    if (result) spaces++;
  }
  const result = spaces === data.length;
  return result;
}

function validText(data = "") {
  const result = /[(\r\n|\r|\n)A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_:#$&/*¡;%?=()"\]\, /[/.-]{2,500}/gi.exec(
    data
  );
  const inRange = data.length >= 2 && data.length <= 500;
  if (result)
    return result[0].length === data.length && inRange && !allSpace(data);
  return false;
}

const validNumber = (payload) => {
  const value = String(payload);
  let result = /[0-9]{1,100}/g.exec(value);
  if (result) return result[0].length === value.length;
  return false;
};

const validEmail = (value = "") => {
  let result = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){3}\.[a-z]{2,3}$/g.exec(
    value
  );
  if (result) return result[0].length === value.length;
  return false;
};

const validName = (data = "") => {
  let result = /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i.exec(data);
  if (result) return result[0].length === data.length && !allSpace(data);
  return false;
};

module.exports = { validText, validName, validNumber, validEmail };
