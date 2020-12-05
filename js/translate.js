/*
 * @name: 谷歌翻译
 * @Author: 
 * @version: 2.0
 * @description: 调用谷歌翻译网站
 * @include: *
 * @createTime: 2019-10-12 09:11:58
 * @updateTime   : 2020-03-16 00:51:04
 */
/*(function () {
  /* 判断是否该执行 */
  /* 网址黑名单制，遇到这些域名不执行 */
  const blackList = ['zhihu.com', 'twitter.com', 'wenku.baidu.com', 'wk.baidu.com'];

  const hostname = window.location.hostname;
  const key = encodeURIComponent('谷花泰:谷歌原生网页翻译:执行判断');
  const isBlack = blackList.some(keyword => {
    if (hostname.match(keyword)) {
      return true;
    };
    return false;
  });

  if (isBlack || window[key]) {
    return;
  };
  window[key] = true;

  /* 开始执行代码 */
  const config = {
    initName: 'googleTranslate',
    initElm: 'google_translate_elm',
    /*多语言页面支持*/
    multilanguagePage: true,
    /* 哪种需要转 */
    pageLanguage: 'auto',
    /* 能转成啥 */
    includedLanguages: 'zh-CN,en',
    /* 隐藏工具bar */
    autoDisplay: false
  };

  /* 注入谷歌翻译脚本 */
  const script = document.createElement('script');
  script.src = `//translate.google.cn/translate_a/element.js?&cb=${config.initName}`;
  script.async = true;
  document.head.appendChild(script);

  /* 创建谷歌翻译右下角的语言选择框容器 */
  const div = document.createElement('div');
  div.id = config.initElm;
  div.setAttribute('style', `
    position: fixed;
    bottom: 5vw;
    right: 5vw;
    z-index: 999999999;
  `);
  document.documentElement.appendChild(div);

  /* 一些样式 */
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      position: relative;
      top: 0 !important;
      left: 0 !important;    
    }
    .skiptranslate iframe{
      width: 0px !important;
      height: 0px !important;
      overflow: hidden;
      display: none !important;
    }
    .goog-te-gadget-simple {
      border: 1px solid #ececec !important;
      border-radius: 4px;
      padding: 8px;
      line-height: 26px;
      text-align: center;
    }
    .goog-te-gadget-simple a,.goog-te-gadget-simple a:link,.goog-te-gadget-simple a:visited,.goog-te-gadget-simple a:hover,.goog-te-gadget-simple a:active{
      text-decoration: none;
      color:inherit;
    }
  `;
  document.head.appendChild(style);

  /* 谷歌翻译实例化函数 */
  window[config.initName] = () => {
    new window.google.translate.TranslateElement({
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      multilanguagePage: config.multilanguagePage,
      pageLanguage: config.pageLanguage,
      includedLanguages: config.includedLanguages,
      autoDisplay: config.autoDisplay
    }, config.initElm);
  };

  /* 监听dom函数 */
  function observe({ targetNode, config = {}, callback = () => { } }) {
    if (!targetNode) {
      return;
    };
    config = Object.assign({
      attributes: true,
      childList: true,
      subtree: true
    }, config);
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  };

  /* 监听右下角的语言选择框 */
  const initElm = document.querySelector(`#${config.initElm}`);
  observe({
    targetNode: initElm,
    config: {
      attributes: false
    },
    callback(mutationList, observer) {
      /* 遍历节点 */
      mutationList.forEach(mutation => {
        Array.from(mutation.addedNodes, node => {
          /* 清除 google image */
          const googleImages = document.querySelectorAll(`#goog-gt-tt img, #${config.initElm} img`);
          Array.from(googleImages, img => {
            img.parentNode.removeChild(img);
          });

          /* 添加关闭按钮 */
          if (node.className === 'goog-te-menu-value') {
            const btnContent = document.querySelector('.goog-te-gadget-simple > span > a');
            const closeBtn = document.createElement('span');
            closeBtn.innerText = 'x | ';
            closeBtn.addEventListener('click', (e) => {
              initElm.parentNode.removeChild(initElm);
              e.stopPropagation();
            }, true);
            btnContent.parentNode.insertBefore(closeBtn, btnContent);
          };

        });
        /* 结束监听 */
        observer.disconnect();
      });
    }
  });
})();*/

// ==UserScript==
// @name         Google网页翻译
// @namespace    https://greasyfork.org/zh-CN/users/150560
// @version      1.1
// @description  不跳转Google翻译页面的整页翻译
// @author       田雨菲
// @match        http://*/*
// @include      https://*/*
// @include      file://*/*
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';
    var userLang = document.documentElement.lang;
    
    if (userLang!=="" && userLang.substr(0, 2) != "zh") {
        var script = document.createElement('script');
        script.src = '//translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit';
        document.getElementsByTagName('head')[0].appendChild(script);

        var google_translate_element = document.createElement('div');
        google_translate_element.id = 'google_translate_element';
        google_translate_element.style = 'position:fixed; bottom:10px; right:10px; cursor:pointer;';
        document.documentElement.appendChild(google_translate_element);

        script = document.createElement('script');
        script.innerHTML = "function googleTranslateElementInit() {" +
            "new google.translate.TranslateElement({" +
            "layout: google.translate.TranslateElement.InlineLayout.SIMPLE," +
            "multilanguagePage: true," +
            "pageLanguage: 'auto'," +
            "includedLanguages: 'zh-CN,zh-TW,en'" +
            "}, 'google_translate_element');}";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();
