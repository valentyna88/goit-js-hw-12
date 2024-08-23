import{a as p,S as q,i as n}from"./assets/vendor-d93b82f1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();p.defaults.baseURL="https://pixabay.com/api/";const w=(s,t)=>{const a={params:{q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,key:"45452240-d9bf2a206a145f9e2645b735d",page:t}};return p.get("",a)},m=s=>s.map(({largeImageURL:t,webformatURL:a,tags:i,likes:e,views:r,comments:o,downloads:v})=>`
    <div class="image-container">
      <li class="gallery-item">
        <div class="image-viewer">
          <a class="gallery-link" href="${t}">
            <img class="gallery-image" src="${a}" alt="${i}" loading="lazy" />
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
            <p>${o}</p>
          </li>
          <li class="gallery-info-item">
            <h3>Downloads</h3>
            <p>${v}</p>
          </li>
        </ul>
      </li>
    </div>
  `).join(""),d=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),y=document.querySelector(".loader"),f=document.querySelector(".load-btn");let P=new q(".js-gallery a"),u="",l=1,g=0;const S=15,L=()=>y.classList.remove("is-hidden"),O=()=>y.classList.add("is-hidden"),$=()=>f.classList.remove("is-hidden"),h=()=>f.classList.add("is-hidden"),b=async(s=!1)=>{try{const t=await w(u,l);if(t.data.hits.length===0)return n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s&&(c.innerHTML=""),!1;s?(g=t.data.totalHits,c.innerHTML=m(t.data.hits)):c.insertAdjacentHTML("beforeend",m(t.data.hits)),l+=1,P.refresh();const a=Math.ceil(g/S);return l>a?(h(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):$(),!0}catch(t){return console.error(t),n.error({message:"Failed to fetch images. Please try again later.",position:"topRight"}),!1}finally{O()}},M=async s=>{if(s.preventDefault(),l=1,u=d.elements.user_query.value.trim(),u===""){n.error({message:"Please enter a search query!",position:"topRight"});return}L(),h(),await b(!0),d.reset()},R=async()=>{L(),h(),await b()};d.addEventListener("submit",M);f.addEventListener("click",R);
//# sourceMappingURL=commonHelpers.js.map
