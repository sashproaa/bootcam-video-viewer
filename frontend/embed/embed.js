const getHtml = async () => {
  const player = document.getElementById('awplayer');
  const pass = player.dataset.pass;
  const response = await fetch(`https://player.quantumobile.com/${pass}`);
  const html = await response.text();
  player.innerHTML = html;

  const scripts = Array.prototype.slice.call(
    player.getElementsByTagName('script'),
  );
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src != '') {
      const tag = document.createElement('script');
      tag.src = scripts[i].src;
      document.getElementsByTagName('head')[0].appendChild(tag);
    } else {
      eval(scripts[i].innerHTML);
    }
  }
};

getHtml();
