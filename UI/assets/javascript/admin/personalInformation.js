let personalInfoSchema = {
  keywords: "string[2]",
  info: "string[4]",
  summary: "string[5]",
  about: "string[5]",
};
function onSuccess(data) {
  console.log(data);
}

withForm("personalInfoForm", personalInfoSchema, onSuccess);
