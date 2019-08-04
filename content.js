/*
 * @Desc: 注入到页面的js
 * @Author: ykst
 * @Date: 2019-08-04 16:35:45
 * @LastEditors: ykst
 * @LastEditTime: 2019-08-04 21:03:33
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const { username, password } = request || {};

  if(username !== void 0 && password !== void 0) {
    // 查找所有 input 添加 value
    const inputList = [...document.getElementsByTagName('input')];

    let usernameDom;
    let passwordDom;
    inputList.forEach((dom, index) => {
      const attrType = dom.getAttribute('type');
      if(attrType === 'password') {
        passwordDom = dom;
        const preIndex = index - 1;
        if(inputList[preIndex]) {
          username = inputList[preIndex];
        }
      }
    })

    if(usernameDom && passwordDom) {
      usernameDom.value = username;
      passwordDom.value = password;
    } else {
      alert('无法正确的找到输入框');
    }
  }
})