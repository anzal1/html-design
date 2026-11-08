(function(){
  var root=document.documentElement,KEY='brook-theme';
  try{var t=localStorage.getItem(KEY);if(t)root.setAttribute('data-theme',t)}catch(e){}
  function current(){var a=root.getAttribute('data-theme');if(a)return a;return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('theme-toggle');
    function label(){b&&(b.textContent=current()==='dark'?'Light mode':'Dark mode')}
    if(b){label();b.addEventListener('click',function(){var n=current()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem(KEY,n)}catch(e){}label()})}
    document.querySelectorAll('input.slider').forEach(function(s){
      function up(){var p=(s.value-s.min)/(s.max-s.min)*100;s.style.setProperty('--p',p+'%');var o=document.getElementById(s.dataset.out);if(o)o.textContent=Number(s.value).toLocaleString()+(s.dataset.unit||'')}
      s.addEventListener('input',up);up();
    });
  });
})();
