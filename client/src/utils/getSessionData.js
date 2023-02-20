import CryptoJS from "crypto-js";

const decrypt = (myData) => {
  try {
    var decryptedData = CryptoJS.AES.decrypt(myData, "randomkey");
    var decryptedDataParsed = JSON.parse(
      decryptedData.toString(CryptoJS.enc.Utf8)
    );
  } catch (err) {
    console.log(err);
  }

  return decryptedDataParsed;
};

function getSessionData(option = 0) {
  let sessionData = {
    isLoggedIn: false,
    email: " ",
    token: " "
  };

  var endata = localStorage.getItem("data");

  if (endata) sessionData = JSON.parse(endata);

  return sessionData;
}

export default getSessionData;
