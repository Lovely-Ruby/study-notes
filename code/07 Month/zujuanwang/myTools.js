(function () {
  document.querySelector('body').innerHTML = mydom;
  document.querySelector('.tools').setAttribute('style', 'display:none');
  document.querySelector('.deleted-box').setAttribute('style', 'display:none');
  if (document.title === '试卷') {
    console.log(document.querySelectorAll('.exam-item__opt'));
    document.querySelectorAll('.exam-item__opt').forEach((i) => i.setAttribute('style', 'display:none'));
  }
})();
