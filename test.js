const accountDataAPI = [
  {
    _id: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    avatar: "www",
  },
  {
    _id: "0x86feeB330218F3917c3d8B6Def77ef96b5FCdC07",
    avatar: "",
  },
  {
    _id: "0x43Ead4e5442f53CAF4DAbe4301D7D9b1F2f04304",
    avatar: "",
  },
];
let tempAllAccount = {};
console.log(accountDataAPI.length);
for (let index = 0; index < accountDataAPI.length; index++) {
  tempAllAccount[accountDataAPI[index]._id] = accountDataAPI[index].avatar;
}
console.log(tempAllAccount["0xdD2FD4581271e230360230F9337D5c0430Bf44C0"]);
console.log(tempAllAccount);
