import{a as p,S as q,i as n}from"./assets/vendor-d93b82f1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();p.defaults.baseURL="https://pixabay.com/api/";const w=(s,t)=>{const o={params:{q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,key:"45452240-d9bf2a206a145f9e2645b735d",page:t}};return p.get("",o)},f=s=>s.map(({largeImageURL:t,webformatURL:o,tags:a,likes:e,views:r,comments:i,downloads:v})=>`
    <div class="image-container">
      <li class="gallery-item">
        <div class="image-viewer">
          <a class="gallery-link" href="${t}">
            <img class="gallery-image" src="${o}" alt="${a}" loading="lazy" />
          </a>
        </div>
        <ul class="gallery-info-list">
          <li class="gallery-info-item">
            <h3>Likes</h3>
            <p>${e}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Views</h3>
            <p>${r}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Comments</h3>
            <p>${i}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Downloads</h3>
            <p>${v}</p>
          </li>
        </ul>
      </li>
    </div>
  `).join(""),u=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),y=document.querySelector(".loader"),m=document.querySelector(".load-btn");let S=new q(".js-gallery a"),h="",l=1,g=0;const P=15,L=()=>y.classList.remove("is-hidden"),O=()=>y.classList.add("is-hidden"),R=()=>m.classList.remove("is-hidden"),c=()=>m.classList.add("is-hidden"),$=()=>{const{height:s}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})},b=async(s=!1)=>{try{const t=await w(h,l);if(t.data.hits.length===0)return n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s&&(d.innerHTML=""),c(),!1;s?(g=t.data.totalHits,d.innerHTML=f(t.data.hits)):d.insertAdjacentHTML("beforeend",f(t.data.hits)),l+=1,S.refresh();const o=Math.ceil(g/P);return l>o?(c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):R(),s||$(),!0}catch(t){return console.error("Fetch Error:",t),n.error({message:"Failed to fetch images. Please try again later.",position:"topRight"}),!1}finally{O()}},H=async s=>{if(s.preventDefault(),l=1,h=u.elements.user_query.value.trim(),h===""){n.error({message:"Please enter a search query!",position:"topRight"});return}L(),c(),await b(!0),u.reset()},M=async()=>{L(),c(),await b()};u.addEventListener("submit",H);m.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
