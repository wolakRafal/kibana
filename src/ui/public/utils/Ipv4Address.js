define(function () {
  let NUM_BYTES = 4;
  let BYTE_SIZE = 256;

  function throwError(ipAddress) {
    throw Error('Invalid IPv4 address: ' + ipAddress);
  }

  function isIntegerInRange(integer, min, max) {
    return !isNaN(integer)
      && integer >= min
      && integer < max
      && integer % 1 === 0;
  }

  function Ipv4Address(ipAddress) {
    this.value = ipAddress;

    if (typeof ipAddress === 'string') {
      this.value = 0;

      let bytes = ipAddress.split('.');
      if (bytes.length !== NUM_BYTES) throwError(ipAddress);

      for (let i = 0; i < bytes.length; i++) {
        let byte = Number(bytes[i]);
        if (!isIntegerInRange(byte, 0, BYTE_SIZE)) throwError(ipAddress);
        this.value += Math.pow(BYTE_SIZE, NUM_BYTES - 1 - i) * byte;
      }
    }

    if (!isIntegerInRange(this.value, 0, Math.pow(BYTE_SIZE, NUM_BYTES))) throwError(ipAddress);
  }

  Ipv4Address.prototype.toString = function () {
    let value = this.value;
    let bytes = [];
    for (let i = 0; i < NUM_BYTES; i++) {
      bytes.unshift(value % 256);
      value = Math.floor(value / 256);
    }
    return bytes.join('.');
  };

  Ipv4Address.prototype.valueOf = function () {
    return this.value;
  };

  return Ipv4Address;
});