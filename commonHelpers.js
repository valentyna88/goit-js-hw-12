import{a as g,S as b,i as u}from"./assets/vendor-d93b82f1.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();g.defaults.baseURL="https://pixabay.com/api/";const p=(r,e)=>{const a={params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15,key:"45452240-d9bf2a206a145f9e2645b735d"}};return g.get("",a)},v=({largeImageURL:r,webformatURL:e,tags:a,likes:o,views:t,comments:s,downloads:i})=>`
  <div class="image-container">
    <li class="gallery-item">
      <div class="image-viewer">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${e}" alt="${a}" loading="lazy" />
        </a>
      </div>
      <ul class="gallery-info-list">
        <li class="gallery-info-item"><h3>Likes</h3><p>${o}</p></li>
        <li class="gallery-info-item"><h3>Views</h3><p>${t}</p></li>
        <li class="gallery-info-item"><h3>Comments</h3><p>${s}</p></li>
        <li class="gallery-info-item"><h3>Downloads</h3><p>${i}</p></li>
      </ul>
    </li>
  </div>
`,h=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),m=document.querySelector(".js-loader"),d=document.querySelector(".js-load-btn");let S=new b(".js-gallery a",{captionsData:"alt"}),l=1,n="",f=0;const q=15,y=r=>{const e=r.map(o=>v(o)).join("");c.insertAdjacentHTML("beforeend",e);const a=c.querySelector("li");a&&(f=a.getBoundingClientRect().height),S.refresh()},L=r=>{const e=Math.ceil(r/q);l>=e?(d.classList.add("is-hidden"),u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):d.classList.remove("is-hidden")},w=async r=>{try{if(r.preventDefault(),n=h.elements.user_query.value.trim(),l=1,n===""){u.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}m.classList.remove("is-hidden");const e=await p(n,l);if(e.data.hits.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.innerHTML="",h.reset(),d.classList.add("is-hidden");return}c.innerHTML="",y(e.data.hits),L(e.data.totalHits)}catch(e){console.error(e)}finally{m.classList.add("is-hidden")}},E=async()=>{try{l++;const r=await p(n,l);y(r.data.hits),window.scrollBy({top:f*2,behavior:"smooth"}),L(r.data.totalHits)}catch(r){console.error(r)}};h.addEventListener("submit",w);d.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
