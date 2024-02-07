// 脚本使用方法请参考 https://www.tampermonkey.net/faq.php 或 https://greasyfork.org/zh-CN (这行代码不要复制)
// 这俩都是国外网站, 上不去的话直接百度 "油猴脚本使用方法" 就行(这行代码也不要复制)

// ==UserScript==
// @name         有没有人一起从零开始刷力扣
// @namespace    likou-replace
// @version      1.0
// @description  none
// @author       Permission
// @match        https://leetcode.cn/circle/article/48kq9d/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

/* globals $, jQuery */
'use strict';

let proMap = new Map(),
    transMap = new Map(),
    buildMapComplete = false;

const getProblems = () => {
    $.get("https://leetcode.cn/api/problems/all/").then((response) => {
        getTrans(JSON.parse(response));
    });
}

const getTrans = (picker) => {
    $.ajax({
        method: "POST",
        url: 'https://leetcode.cn/graphql/',
        headers: {
            "content-type": "application/json",
            "x-definition-name": "getQuestionTranslation",
            "x-operation-name": "getQuestionTranslation",
            "x-csrftoken": getCookie("csrftoken"),
            "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        data: JSON.stringify({
            "operationName": "getQuestionTranslation",
            "variables": {},
            "query": "query getQuestionTranslation($lang: String) {translations: allAppliedQuestionTranslations(lang: $lang) {title questionId __typename}}"
        })
    }).then((trans) => {
        buildMap(picker, trans);
    });
}


const buildMap = (picker, trans) => {
    for (let pro of picker.stat_status_pairs) {
        proMap.set(pro.stat.frontend_question_id, pro.stat.question__title_slug);
    }
    for (let t of trans.data.translations) {
        transMap.set(t.questionId, t.title);
    }
    buildMapComplete = true;
};

const getCookie = (name) => {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};

const replace = () => {
    let even = true;
    for (let problem of $("table tr td")) {
        if (!even) {
            let htmlString = "";
            let normalExit = true;
            for (let id of problem.textContent.split('、')) {
                if (isNaN(parseInt(id))) {
                    normalExit = false;
                    break;
                }
                htmlString += `<a href = 'https://leetcode.cn/problems/${proMap.get(id)}/' title = '${transMap.get(id)}' target = '_blank'>${id}</a>、`;
            }
            if (normalExit) {
                problem.innerHTML = `<td>${htmlString.substring(0, htmlString.length - 1)}</td>`;
            }
        }
        even = !even;
    }

}

getProblems();

const interval = setInterval(() => {
    if (buildMapComplete && $("table tr td").length !== 0) {
        clearInterval(interval);
        replace();
    }
}, 5e2);