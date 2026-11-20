(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  if (!data) throw new Error('Missing content.js.');
  const { settings, photography, journals, garden } = data;
  const main = document.querySelector('#main');
  const lightbox = document.querySelector('#lightbox');
  const state = { photoFilter: 'all', gardenFilter: 'all', gardenView: 'index', lightboxPhotos: [], lightboxIndex: -1 };

  const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateLong = d => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
  const dateShort = d => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', {month:'short',day:'2-digit',year:'numeric'});
  const counts = {photography:photography.length,journal:journals.length,garden:garden.length};
  const sampleMark = item => item.sample ? `<span class="sample-tag">Sample</span>` : '';
  const demoNotice = `<div class="demo-notice"><span class="small-star" aria-hidden="true">✳</span><span>These are <strong>sample pieces and abstract placeholder images</strong>, included to demonstrate the layout. Replace them with your own work in <code>content.js</code> and <code>assets/photographs/</code>.</span></div>`;
  const sectionHeader = (eyebrow, title, secondary = '') => `<div class="section-head section-line"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2></div><div class="section-index">${secondary}</div></div>`;
  const intro = (eyebrow, title, deck, side = '') => `<header class="page-intro"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><div class="deck">${deck}</div>${side ? `<div class="intro-side">${side}</div>` : ''}</header>`;

  function homePage() {
    const featured = journals[0];
    const heroPhoto = photography[0];
    const secondPhoto = photography[2] || photography[0];
    return `<div class="page page-home">
      <section class="hero">
        <div class="hero-copy">
          <div class="eyebrow">A personal archive &nbsp; / &nbsp; Vol. 001</div>
          <h1>A practice<br>of <em>noticing.</em></h1>
          <p class="hero-intro">${escape(settings.introduction)}</p>
          <a class="text-link" href="#/photography">Enter the archive <span class="arrow">↗</span></a>
        </div>
        <div class="hero-art" aria-label="Abstract gallery preview">
          <img class="hero-image" src="${escape(heroPhoto.image)}" alt="${escape(heroPhoto.alt)}" />
          <img class="hero-image-small" src="${escape(secondPhoto.image)}" alt="${escape(secondPhoto.alt)}" />
          <span class="hero-mark" aria-hidden="true">✳</span>
          <span class="hero-image-note">Visual placeholders / 001</span>
        </div>
      </section>
      <section aria-labelledby="collections-heading">
        ${sectionHeader('01 — The collections', '<span id="collections-heading">A few directions.</span>', 'THREE WAYS IN')}
        <div class="portal-grid">
          <a class="portal" href="#/photography"><div class="portal-number">01 / IMAGE</div><div class="portal-doodle" aria-hidden="true"></div><h3>Collected<br><em>light.</em></h3><div class="portal-bottom"><span>Photographs & visual studies<br>${counts.photography} images</span><span class="portal-arrow">↗</span></div></a>
          <a class="portal" href="#/journal"><div class="portal-number">02 / WORD</div><h3>In the<br><em>margins.</em></h3><div class="portal-bottom"><span>Essays, fragments & field notes<br>${counts.journal} entries</span><span class="portal-arrow">↗</span></div></a>
          <a class="portal" href="#/garden"><div class="portal-number">03 / THOUGHT</div><h3>Still<br><em>growing.</em></h3><div class="portal-bottom"><span>Notes, questions & connections<br>${counts.garden} ideas</span><span class="portal-arrow">↗</span></div></a>
        </div>
      </section>
      <section class="latest-section" aria-labelledby="latest-heading">
        ${sectionHeader('02 — Recently filed', '<span id="latest-heading">From the journal.</span>', 'WORDS IN PROGRESS')}
        <div class="latest-list">${journals.slice(0,2).map(entry => `<a class="latest-item" href="#/journal/${encodeURIComponent(entry.id)}"><span class="date">${dateShort(entry.date)}</span><div><h3>${escape(entry.title)}</h3><p>${escape(entry.excerpt)}</p></div><span class="go">↗</span></a>`).join('')}</div>
      </section>
      ${demoNotice}
    </div>`;
  }

  function photographyPage() {
    const categories = ['all',...new Set(photography.map(p => p.category))];
    const visible = photography.filter(p => state.photoFilter === 'all' || p.category === state.photoFilter);
    return `<div class="page page-photography">
      ${intro('01 — Photography', 'Collected <em>light.</em>', 'An evolving index of places, textures, and moments that asked to be looked at twice.', `${photography.length.toString().padStart(2,'0')} fragments, no fixed chronology`)}
      ${demoNotice}
      <div class="toolbar"><div class="filter-list" aria-label="Photography filters">${categories.map(c => `<button type="button" class="filter-chip ${c===state.photoFilter?'selected':''}" data-photo-filter="${escape(c)}" aria-pressed="${c===state.photoFilter}">${escape(c==='all'?'All work':c)}</button>`).join('')}</div><div class="toolbar-meta">${visible.length.toString().padStart(2,'0')} / ${photography.length.toString().padStart(2,'0')} works</div></div>
      ${visible.length ? `<div class="gallery">${visible.map((p,i) => `<button class="photo-card" type="button" data-photo-open="${escape(p.id)}" aria-label="View ${escape(p.title)}"><span class="photo-image-wrap"><img src="${escape(p.image)}" alt="${escape(p.alt)}" loading="lazy" style="--ratio:${i%3===0?'5 / 4':i%3===1?'4 / 5':'6 / 5'}"></span><span class="photo-meta"><span><span class="photo-title">${escape(p.title)}</span><br>${sampleMark(p)}</span><span class="photo-submeta">${escape(p.category)} · ${escape(p.year)}</span></span></button>`).join('')}</div>` : `<p class="empty-state">Nothing here yet.</p>`}
    </div>`;
  }

  function journalPage() {
    const sorted = [...journals].sort((a,b) => b.date.localeCompare(a.date));
    return `<div class="page page-journal">
      ${intro('02 — Journal', 'Words in the <em>margins.</em>', 'Reflections, pieces of memory, and sentences with nowhere else to go.', `${journals.length.toString().padStart(2,'0')} entries and counting`)}
      ${demoNotice}
      <div class="journal-list">${sorted.map(e => `<a class="journal-row" href="#/journal/${encodeURIComponent(e.id)}"><span class="journal-date">${dateLong(e.date)}</span><div><h2>${escape(e.title)}</h2><p>${escape(e.excerpt)}</p><div class="entry-tags"><span>${escape(e.category)}</span><span>·</span><span>${readingTime(e.blocks)} min read</span>${sampleMark(e)}</div></div><span class="journal-arrow">↗</span></a>`).join('')}</div>
    </div>`;
  }

  function readingTime(blocks) {
    const words = (blocks||[]).map(b=>b.text||'').join(' ').trim().split(/\s+/).length;
    return Math.max(1,Math.ceil(words/200));
  }

  function articlePage(id) {
    const e = journals.find(v=>v.id===id);
    if(!e)return notFound();
    return `<div class="page page-article">
      <div class="article-top"><a class="back-link" href="#/journal">← &nbsp; All writing</a></div>
      <header class="article-head"><div class="eyebrow">Journal / ${escape(e.category)} ${e.sample?' / SAMPLE ENTRY':''}</div><h1>${escape(e.title)}</h1><div class="article-detail"><span>${dateLong(e.date)}</span><span>·</span><span>${readingTime(e.blocks)} min read</span></div></header>
      <article class="article-body">${e.blocks.map(block => block.type==='quote' ? `<blockquote>${escape(block.text)}</blockquote>` : `<p>${escape(block.text)}</p>`).join('')}</article>
      <div class="article-end"><a href="#/journal" class="text-link">Back to all entries <span class="arrow">↗</span></a></div>
    </div>`;
  }

  function gardenPage() {
    const categories=['all',...new Set(garden.map(n=>n.category))];
    const notes=garden.filter(n=>state.gardenFilter==='all'||n.category===state.gardenFilter);
    return `<div class="page page-garden">
      ${intro('03 — Digital garden', 'An unfinished <em>atlas.</em>', 'A collection of questions, observations, and ideas that are allowed to change. Follow a thread, or wander.', `${garden.length.toString().padStart(2,'0')} ideas, various states of becoming`)}
      <div class="garden-note">Not everything needs to be finished to be worth keeping.</div>
      <div style="height:42px"></div>
      ${demoNotice}
      <div class="garden-tools"><div class="filter-list" aria-label="Note filters">${categories.map(c=>`<button type="button" class="filter-chip ${c===state.gardenFilter?'selected':''}" data-garden-filter="${escape(c)}" aria-pressed="${c===state.gardenFilter}">${escape(c==='all'?'All notes':c)}</button>`).join('')}</div><div class="view-options" aria-label="Garden view"><button type="button" class="view-toggle ${state.gardenView==='index'?'selected':''}" data-garden-view="index" aria-pressed="${state.gardenView==='index'}">Index</button><button type="button" class="view-toggle ${state.gardenView==='map'?'selected':''}" data-garden-view="map" aria-pressed="${state.gardenView==='map'}">Map ↗</button></div></div>
      ${state.gardenView==='index' ? `<div class="garden-grid">${notes.map((n,i)=>`<a class="note-card" href="#/garden/${encodeURIComponent(n.id)}"><div class="note-card-top"><span class="note-number">Nº ${(i+1).toString().padStart(2,'0')}</span><span class="status ${escape(n.status)}">${escape(n.status)}</span></div><div><h3>${escape(n.title)}</h3><p>${escape(n.excerpt)}</p></div><div class="note-bottom"><span>${escape(n.category)} ${n.sample?'· SAMPLE':''}</span><span class="go">↗</span></div></a>`).join('')}</div>` : gardenMap(notes)}
    </div>`;
  }

  function gardenMap(notes){
    const set=new Set(notes.map(n=>n.id));
    const nodes=[];const edgeKeys=new Set();
    for (const n of notes){
      for(const id of n.links){
        if(!set.has(id))continue;
        const key=[n.id,id].sort().join('~');
        if(edgeKeys.has(key))continue;
        edgeKeys.add(key);
        const other=notes.find(v=>v.id===id);
        nodes.push(`<line x1="${n.x*10}" y1="${n.y*10}" x2="${other.x*10}" y2="${other.y*10}" stroke="#b5a99a" stroke-width="1.6" stroke-dasharray="4 7" vector-effect="non-scaling-stroke" />`);
      }
    }
    return `<div class="map-area" aria-label="Connected ideas map"><svg class="map-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">${nodes.join('')}</svg>${notes.map(n=>`<a href="#/garden/${encodeURIComponent(n.id)}" class="map-node" style="left:clamp(64px, ${n.x}%, calc(100% - 64px));top:clamp(40px, ${n.y}%, calc(100% - 45px))"><span class="tiny">${escape(n.category)} / ${escape(n.status)}</span>${escape(n.title)}</a>`).join('')}<span class="map-caption">Click a thought to follow it · lines show connections</span></div>`;
  }

  function notePage(id) {
    const n=garden.find(v=>v.id===id);
    if(!n)return notFound();
    return `<div class="page page-note"><section class="note-detail"><a class="back-link" href="#/garden">← &nbsp; Back to the garden</a><header><div class="eyebrow">${escape(n.category)} / ${escape(n.status)} ${n.sample?' / sample note':''}</div><h1>${escape(n.title)}</h1><div class="article-detail"><span>First planted ${dateLong(n.date)}</span><span>·</span><span>Open to revision</span></div></header><div class="note-detail-text">${escape(n.body)}</div><div class="related-head">Follow a thread</div><div class="related-list">${(n.links||[]).map(id=>garden.find(v=>v.id===id)).filter(Boolean).map(related=>`<a class="related-link" href="#/garden/${encodeURIComponent(related.id)}">${escape(related.title)} ↗</a>`).join('') || '<span>More connections soon.</span>'}</div></section></div>`;
  }

  function aboutPage(){
    const links = [];
    if(settings.email)links.push(`<a href="mailto:${escape(settings.email)}">Email ↗</a>`);
    if(settings.instagram && /^https:\/\//.test(settings.instagram))links.push(`<a href="${escape(settings.instagram)}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>`);
    return `<div class="page about-page">
      ${intro('00 — About', 'A space for <em>becoming.</em>', 'A small archive on an otherwise enormous internet.')}
      <div class="about-body"><p class="intro">For the things I make, the things I notice, and the thoughts that are not quite ready to become anything else.</p><div class="about-text"><p>${escape(settings.about)}</p><p>This site belongs to <strong>${escape(settings.ownerName)}</strong>. It gathers photographs, journal entries, and a digital garden: a growing map of ideas that may or may not lead somewhere.</p><p>Nothing here has to be complete.</p>${links.length?`<div class="about-links">${links.join('')}</div>`:''}</div></div>
    </div>`;
  }
  function notFound(){return `<div class="page">${intro('Error / 404', 'Lost in the <em>margins.</em>', 'That page does not exist, or it has moved.')}<p style="margin-bottom:120px"><a href="#/" class="text-link">Return home <span class="arrow">↗</span></a></p></div>`}

  function route(){
    if(lightbox.open)closeLightbox();
    const fragments=decodeURIComponent((location.hash||'#/').replace(/^#\/?/,'')).split('/').filter(Boolean);
    const section=fragments[0]||'home';
    const id=fragments[1]||'';
    if(section==='home')main.innerHTML=homePage();
    else if(section==='photography')main.innerHTML=photographyPage();
    else if(section==='journal')main.innerHTML=id?articlePage(id):journalPage();
    else if(section==='garden')main.innerHTML=id?notePage(id):gardenPage();
    else if(section==='about')main.innerHTML=aboutPage();
    else main.innerHTML=notFound();
    document.querySelectorAll('[data-nav]').forEach(el=>{
      const active=el.dataset.nav===section;el.classList.toggle('active',active);
      if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
    });
    const labels={home:'Home',photography:'Photography',journal:'Journal',garden:'Digital Garden',about:'About'};
    document.title=`${labels[section]||'Not found'} — ${settings.siteName}`;
    window.scrollTo({top:0,behavior:'instant'});
  }

  function currentPhotoList() {return photography.filter(p=>state.photoFilter==='all'||p.category===state.photoFilter)}
  function openLightbox(id){
    state.lightboxPhotos=currentPhotoList();
    state.lightboxIndex=state.lightboxPhotos.findIndex(p=>p.id===id);
    if(state.lightboxIndex<0)return;
    paintLightbox();
    lightbox.showModal();
    document.body.classList.add('dialog-open');
    lightbox.querySelector('.lightbox-close')?.focus();
  }
  function paintLightbox(){
    const p=state.lightboxPhotos[state.lightboxIndex];if(!p)return;
    lightbox.innerHTML=`<div class="lightbox-inner"><div class="lightbox-top"><span class="mono">${escape(settings.siteName)} / photography</span><button class="lightbox-close" aria-label="Close photograph viewer" data-lightbox-close>×</button></div><div class="lightbox-view"><button class="lightbox-nav" aria-label="Previous photograph" data-lightbox-prev>←</button><img src="${escape(p.image)}" alt="${escape(p.alt)}"><button class="lightbox-nav" aria-label="Next photograph" data-lightbox-next>→</button></div><div class="lightbox-bottom"><div class="lightbox-desc"><strong>${escape(p.title)}</strong><span>${escape(p.description)} ${p.sample?'(Sample image)':''}</span></div><span class="lightbox-count">${String(state.lightboxIndex+1).padStart(2,'0')} / ${String(state.lightboxPhotos.length).padStart(2,'0')}</span></div></div>`;
  }
  function moveLightbox(delta){state.lightboxIndex=(state.lightboxIndex+delta+state.lightboxPhotos.length)%state.lightboxPhotos.length;paintLightbox()}
  function closeLightbox(){lightbox.close();document.body.classList.remove('dialog-open')}

  document.addEventListener('click', e=>{
    const photoFilter=e.target.closest('[data-photo-filter]');
    if(photoFilter){state.photoFilter=photoFilter.dataset.photoFilter;main.innerHTML=photographyPage();return}
    const gardenFilter=e.target.closest('[data-garden-filter]');
    if(gardenFilter){state.gardenFilter=gardenFilter.dataset.gardenFilter;main.innerHTML=gardenPage();return}
    const gardenView=e.target.closest('[data-garden-view]');
    if(gardenView){state.gardenView=gardenView.dataset.gardenView;main.innerHTML=gardenPage();return}
    const photo=e.target.closest('[data-photo-open]');
    if(photo){openLightbox(photo.dataset.photoOpen);return}
    if(e.target.closest('[data-lightbox-close]')){closeLightbox();return}
    if(e.target.closest('[data-lightbox-prev]')){moveLightbox(-1);return}
    if(e.target.closest('[data-lightbox-next]')){moveLightbox(1);return}
  });
  lightbox.addEventListener('click', e=>{if(e.target===lightbox)closeLightbox()});
  lightbox.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  document.addEventListener('keydown',e=>{
    if(!lightbox.open)return;
    if(e.key==='ArrowLeft'){e.preventDefault();moveLightbox(-1)}
    if(e.key==='ArrowRight'){e.preventDefault();moveLightbox(1)}
  });
  document.querySelector('#brand-name').textContent=settings.siteName;
  document.querySelector('#footer-wordmark').textContent=settings.siteName;
  document.querySelector('#footer-year').textContent=String(new Date().getFullYear());
  window.addEventListener('hashchange',route);
  route();
})();
