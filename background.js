/*
 * @Desc: background.js
 * @Author: ykst
 * @Date: 2019-08-03 23:55:29
 * @LastEditors: ykst
 * @LastEditTime: 2019-08-04 20:24:36
 */
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {

});

function test() {
  alert('我是background！');
}
