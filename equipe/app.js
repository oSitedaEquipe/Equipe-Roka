/* Conteúdo, fotos e links são editados separadamente em conteudo.js. */
(() => {
  'use strict';
  const config = window.ROKA_CONTEUDO || {};
  const profiles = Array.isArray(config.perfis) ? config.perfis : [];
  const create = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };
  const fit = value => ['top', 'bottom', 'center'].includes(value) ? value : 'center';
  const profileDialog = document.getElementById('profile-sheet');
  const profilePhoto = document.getElementById('profile-photo');
  const profilePlaceholder = document.getElementById('profile-photo-placeholder');
  let profileTrigger = null;

  // Os dois diálogos reutilizam a arte aprovada, sem alterar suas cores.
  ['profile', 'about'].forEach(destination => {
    document.querySelectorAll('#titulo-site .lettering').forEach(source => {
      const art = source.cloneNode(true);
      art.querySelectorAll('clipPath').forEach(clip => {
        const previousId = clip.id;
        clip.id = previousId + '-' + destination;
        art.querySelectorAll('image').forEach(image => {
          if (image.getAttribute('clip-path') === 'url(#' + previousId + ')') {
            image.setAttribute('clip-path', 'url(#' + clip.id + ')');
          }
        });
      });
      document.getElementById(destination + '-brand').append(art);
    });
  });

  function openProfile(profile, trigger) {
    profileTrigger = trigger;
    const name = String(profile.nome || '').trim();
    document.getElementById('profile-name').textContent = name || 'Nome não informado';
    document.getElementById('profile-sex').textContent = String(profile.sexo || '').trim() || 'Não informado';
    document.getElementById('profile-role').textContent = String(profile.cargo || '').trim() || 'Não informado';
    document.getElementById('profile-about').textContent = String(profile.sobre || profile.descricao || '').trim() || 'Informações ainda não adicionadas.';
    profilePhoto.querySelectorAll('img').forEach(image => image.remove());
    profilePlaceholder.hidden = false;
    const photo = String(profile.foto || '').trim();
    if (photo) {
      const image = document.createElement('img');
      image.alt = 'Foto de ' + (name || profile.cargo || 'membro');
      image.decoding = 'async';
      image.hidden = true;
      image.addEventListener('load', () => {
        if (!image.isConnected) return;
        image.hidden = false;
        profilePlaceholder.hidden = true;
      }, { once: true });
      image.addEventListener('error', () => image.remove(), { once: true });
      profilePhoto.append(image);
      image.src = photo;
    }
    profileDialog.showModal();
  }

  function makeProfile(profile, showRole) {
    const figure = create('figure', 'profile');
    figure.id = 'quadrado-' + profile.id;
    figure.dataset.profileId = profile.id;
    if (showRole) {
      const caption = create('figcaption', 'role-label');
      caption.textContent = profile.cargo;
      figure.append(caption);
    }
    const frame = create('button', 'photo-frame');
    frame.type = 'button';
    frame.setAttribute('aria-haspopup', 'dialog');
    frame.setAttribute('aria-controls', 'profile-sheet');
    frame.setAttribute('aria-label', 'Abrir perfil de ' + (profile.nome || profile.id.replaceAll('-', ' ')));
    frame.addEventListener('click', () => openProfile(profile, frame));
    let question;
    if (profile.id === 'deus') {
      question = create('span', 'question-mark');
      question.textContent = '?';
      question.setAttribute('aria-hidden', 'true');
      frame.append(question);
    }
    const photo = String(profile.foto || '').trim();
    if (photo) {
      const image = document.createElement('img');
      image.alt = '';
      image.loading = ['base', 'fundador'].includes(profile.grupo) ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.style.objectPosition = fit(profile.posicao);
      image.addEventListener('load', () => {
        if (question) question.hidden = true;
      }, { once: true });
      image.addEventListener('error', () => {
        image.remove();
        if (question) question.hidden = false;
      }, { once: true });
      frame.append(image);
      image.src = photo;
    }
    figure.append(frame);
    return figure;
  }

  const leaders = create('div', 'leaders');
  ['base', 'fundador'].forEach(group => {
    profiles.filter(profile => profile.grupo === group).forEach(profile => leaders.append(makeProfile(profile, true)));
  });
  const administrators = create('div', 'administrators');
  profiles.filter(profile => profile.grupo === 'administracao').forEach(profile => administrators.append(makeProfile(profile, true)));
  document.getElementById('official-roster').replaceChildren(leaders, administrators);

  const pyramid = document.getElementById('unofficial-roster');
  const members = profiles.filter(profile => profile.grupo === 'membros');
  const lines = Array.from(new Set(members.map(profile => Number(profile.linha) || 1))).sort((a, b) => a - b);
  lines.forEach(line => {
    const row = create('div', 'member-row');
    members.filter(profile => (Number(profile.linha) || 1) === line).forEach(profile => row.append(makeProfile(profile, false)));
    pyramid.append(row);
  });

  const themeButton = document.getElementById('theme-toggle');
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const label = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema noturno';
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    document.getElementById('theme-color').content = theme === 'dark' ? '#000000' : '#ffffff';
    try { localStorage.setItem('roka-tema', theme); } catch (error) {}
  };
  setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  const drawer = document.getElementById('navigation-drawer');
  const menuButton = document.getElementById('open-menu');
  menuButton.addEventListener('click', () => {
    drawer.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
  });
  document.getElementById('close-menu').addEventListener('click', () => drawer.close());
  drawer.addEventListener('close', () => menuButton.setAttribute('aria-expanded', 'false'));
  drawer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;
      event.preventDefault();
      drawer.close();
      history.pushState(null, '', link.getAttribute('href'));
      section.scrollIntoView({ block: 'start' });
      section.focus({ preventScroll: true });
    });
  });

  const about = document.getElementById('about-dialog');
  document.getElementById('about-title').textContent = config.sobre && config.sobre.titulo || 'Sobre';
  document.getElementById('about-copy').textContent = config.sobre && config.sobre.texto || '';
  const aboutMedia = document.getElementById('about-media');
  const aboutImagePath = String(config.sobre && config.sobre.imagem || '').trim();
  if (aboutImagePath) {
    const image = document.createElement('img');
    image.alt = String(config.sobre.descricaoImagem || '').trim() || 'Imagem da Equipe Róka';
    image.decoding = 'async';
    image.addEventListener('load', () => { aboutMedia.hidden = false; }, { once: true });
    image.addEventListener('error', () => { aboutMedia.hidden = true; image.remove(); }, { once: true });
    aboutMedia.append(image);
    image.src = aboutImagePath;
  }
  document.getElementById('open-about').addEventListener('click', () => {
    drawer.close();
    about.showModal();
  });
  document.getElementById('close-about').addEventListener('click', () => about.close());
  about.addEventListener('close', () => menuButton.focus({ preventScroll: true }));
  document.getElementById('close-profile').addEventListener('click', () => profileDialog.close());
  profileDialog.addEventListener('close', () => {
    if (profileTrigger && profileTrigger.isConnected) profileTrigger.focus({ preventScroll: true });
  });
  [drawer, about, profileDialog].forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });

  const links = config.links || {};
  [['youtube-link', links.youtube], ['roka-hub-link', links.rokaHub], ['discord-link', links.discord]].forEach(entry => {
    if (entry[1]) document.getElementById(entry[0]).href = String(entry[1]).trim();
  });

  const carousel = document.getElementById('carousel');
  const frame = document.getElementById('carousel-frame');
  const pagination = document.getElementById('carousel-pagination');
  const status = document.getElementById('carousel-status');
  const previous = document.getElementById('previous-slide');
  const next = document.getElementById('next-slide');
  const slides = Array.isArray(config.carrossel) && config.carrossel.length ? config.carrossel : [{ foto: '' }];
  const slideNodes = [];
  const dots = [];
  let active = 0;

  const showSlide = index => {
    active = (index + slides.length) % slides.length;
    slideNodes.forEach((node, i) => { node.hidden = i !== active; });
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === active ? 'true' : 'false');
      dot.tabIndex = i === active ? 0 : -1;
    });
    status.textContent = 'Imagem ' + (active + 1) + ' de ' + slides.length;
  };

  slides.forEach((slide, index) => {
    const node = create('div', 'carousel-slide');
    node.setAttribute('role', 'group');
    node.setAttribute('aria-roledescription', 'slide');
    node.setAttribute('aria-label', 'Imagem ' + (index + 1) + ' de ' + slides.length);
    const photo = String(slide.foto || '').trim();
    if (photo) {
      const image = document.createElement('img');
      image.alt = slide.descricao || 'Imagem ' + (index + 1) + ' da Equipe Róka';
      image.decoding = 'async';
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.style.objectPosition = fit(slide.posicao);
      image.addEventListener('error', () => {
        image.remove();
        node.setAttribute('aria-label', 'Imagem indisponível: ' + (index + 1));
      }, { once: true });
      image.src = photo;
      node.append(image);
    }
    node.hidden = index !== 0;
    slideNodes.push(node);
    frame.append(node);
    const dot = create('button', 'carousel-dot');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Mostrar imagem ' + (index + 1) + ' de ' + slides.length);
    dot.addEventListener('click', () => showSlide(index));
    dots.push(dot);
    pagination.append(dot);
  });

  previous.addEventListener('click', () => showSlide(active - 1));
  next.addEventListener('click', () => showSlide(active + 1));
  previous.disabled = next.disabled = slides.length < 2;
  carousel.addEventListener('keydown', event => {
    const moves = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    showSlide(moves[event.key]);
    if (event.target.closest('.carousel-pagination')) dots[active].focus();
  });
  let gesture;
  frame.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') gesture = { x: event.clientX, y: event.clientY };
  });
  frame.addEventListener('pointerup', event => {
    if (!gesture) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 60) showSlide(active + (dx < 0 ? 1 : -1));
  });
  frame.addEventListener('pointercancel', () => { gesture = null; });
  showSlide(0);
})();
