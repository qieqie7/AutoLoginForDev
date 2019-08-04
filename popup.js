/*
 * @Desc: 
 * @Author: ykst
 * @Date: 2019-08-04 00:19:05
 * @LastEditors: ykst
 * @LastEditTime: 2019-08-04 16:19:26
 */
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const addUserInfo = document.getElementById('addUserInfo');

let titleForm = document.getElementById('title');
let usernameForm = document.getElementById('username');
let passwordForm = document.getElementById('password');
let warnDom = document.getElementById('warn');
let listGroupDom = document.getElementById('listGroup');

function handleAddUserInfo(event) {
  event.preventDefault();
  let title = titleForm.value.trim();
  let username = usernameForm.value.trim();
  let password = passwordForm.value;

  if(!username) {
    warnDom.style = "display: block";
    return;
  }

  warnDom.style = "display: none";

  if(!title) {
    title = username
  }

  const result = {
    title,
    username,
    password,
  }

  chrome.storage.sync.get('userList',function(data) {
    const preResultList = data.userList
    let currentResultList;
    if(preResultList) {
      preResultList.push(result);
      currentResultList = preResultList;
    } else {
      currentResultList = [result];
    }

    chrome.storage.sync.set({ userList: currentResultList } , function() {
      console.log('储存完毕');
      initialListGroup();
    })
  })
}

addUserInfo.addEventListener('click', handleAddUserInfo);

function handleListItem(event) {
  const target = event.target;
  // 删除功能
  if(target.tagName === 'SPAN') {
    const index = target.dataset.index;
    chrome.storage.sync.get('userList', function(data) {
      const preResultList = data.userList;
      if(preResultList) {
        preResultList.splice(index, 1);
      }

      chrome.storage.sync.set({userList: preResultList}, function() {
        console.log('删除完成');
        initialListGroup();
      });
    })
  }
  // 准备帮助登录
  if(target.tagName === 'A') {
    const username = target.dataset.username;
    const password = target.dataset.password;
    console.log(username, password);
  }
}

listGroupDom.addEventListener('click', handleListItem)

function initialListGroup() {
  chrome.storage.sync.get('userList', function (data) {
    const userList = data.userList || [];
    let html = '';
    userList.forEach((userInfo, index) => {
      html += `
      <a 
        href="#" 
        class="list-group-item list-group-item-action"
        data-username="${userInfo.username}"
        data-password="${userInfo.password}"
      >
        ${userInfo.title}
        <button type="button" class="close" aria-label="Close">
          <span data-index="${index}" aria-hidden="true">&times;</span>
        </button>
      </a>`
    })
    listGroupDom.innerHTML = html;
  })
}

initialListGroup();