import{i as a,S as d}from"./assets/vendor-f33cd494.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const h="45452240-d9bf2a206a145f9e2645b735d",g="https://pixabay.com/api/";function y(i){const s=new URLSearchParams({key:h,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${g}?${s}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function p(i){const s=document.querySelector(".js-gallery");s.innerHTML="";const t=i.map(({largeImageURL:o,webformatURL:e,tags:r,likes:l,views:u,comments:m,downloads:f})=>`
    <div class="image-container">
      <li class="gallery-item">
        <div class="image-viewer">
          <a class="gallery-link" href="${o}">
            <img class="gallery-image" src="${e}" alt="${r}" loading="lazy" />
          </a>
        </div>
        <ul class="gallery-info-list">
          <li class="gallery-info-item">
            <h3>Likes</h3>
            <p>${l}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Views</h3>
            <p>${u}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Comments</h3>
            <p>${m}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Downloads</h3>
            <p>${f}</p>
          </li>
        </ul>
      </li>
    </div>
  `).join("");s.innerHTML=t}const L=document.querySelector(".js-search-form"),c=document.querySelector(".loader");let n;L.addEventListener("submit",function(i){i.preventDefault();const s=i.target.elements.user_query.value.trim();if(s===""){a.error({title:"Error",message:"Please enter a search term."});return}c.classList.remove("is-hidden"),y(s).then(t=>{t.hits.length===0?a.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(p(t.hits),n?n.refresh():n=new d(".gallery a"))}).catch(t=>{console.error(t),a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}).finally(()=>{c.classList.add("is-hidden"),i.target.reset()})});
//# sourceMappingURL=commonHelpers.js.map
