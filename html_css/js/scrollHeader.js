window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
    if(scrolled !== 0){
      // Если прокрутка есть, то делаем блок прозрачным
    //   document.querySelector('.wrap-header-land').style.opacity = '1';
    document.querySelector('.wrap-header-land').style.backgroundColor = 'white';
    document.querySelector('.linkColor').style.color = 'black';
    document.querySelector('.linkColor2').style.color = 'black';
    document.querySelector('.linkColor3').style.color = 'black';
    document.querySelector('.linkColor4').style.color = 'black';
    document.querySelector('.linkColor5').style.color = 'black';
    document.querySelector('.linkLogo').style.color = 'black';
    }else{
      // Если нет, то делаем его полностью видимым
    //   document.querySelector('.wrap-header-land').style.i = '0';
      document.querySelector('.wrap-header-land').style.backgroundColor = 'transparent';
      document.querySelector('.linkColor').style.color = 'white';
      document.querySelector('.linkColor2').style.color = 'white';
      document.querySelector('.linkColor3').style.color = 'white';
      document.querySelector('.linkColor4').style.color = 'white';
      document.querySelector('.linkColor5').style.color = 'white';
      document.querySelector('.linkLogo').style.color = 'white';
    };
  };