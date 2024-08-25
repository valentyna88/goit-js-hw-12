import{a as u,S as b,i as l}from"./assets/vendor-d93b82f1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();u.defaults.baseURL="https://pixabay.com/api/";const p=async(r,t)=>{const a={params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15,key:"45452240-d9bf2a206a145f9e2645b735d"}};return(await u.get("",a)).data},v=({largeImageURL:r,webformatURL:t,tags:a,likes:i,views:e,comments:s,downloads:o})=>`
  <div class="image-container">
    <li class="gallery-item">
      <div class="image-viewer">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${t}" alt="${a}" loading="lazy" />
        </a>
      </div>
      <ul class="gallery-info-list">
        <li class="gallery-info-item"><h3>Likes</h3><p>${i}</p></li>
        <li class="gallery-info-item"><h3>Views</h3><p>${e}</p></li>
        <li class="gallery-info-item"><h3>Comments</h3><p>${s}</p></li>
        <li class="gallery-info-item"><h3>Downloads</h3><p>${o}</p></li>
      </ul>
    </li>
  </div>
`,g=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),m=document.querySelector(".js-loader"),h=document.querySelector(".js-load-btn");let w=new b(".js-gallery a",{captionsData:"alt"}),n=1,c="",f=0;const P=15,y=r=>{const t=r.map(i=>v(i)).join("");d.insertAdjacentHTML("beforeend",t);const a=d.querySelector("li");a&&(f=a.getBoundingClientRect().height),w.refresh()},L=r=>{const t=Math.ceil(r/P);n>=t?(h.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):h.classList.remove("is-hidden")},S=async r=>{try{if(r.preventDefault(),c=g.elements.user_query.value.trim(),n=1,c===""){l.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}m.classList.remove("is-hidden");const t=await p(c,n);if(t.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d.innerHTML="",g.reset(),h.classList.add("is-hidden");return}d.innerHTML="",y(t.hits),L(t.totalHits)}catch{l.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}finally{m.classList.add("is-hidden")}},q=async()=>{try{n++;const r=await p(c,n);y(r.hits),window.scrollBy({top:f*2,behavior:"smooth"}),L(r.totalHits)}catch{l.error({message:"An error occurred while loading more images. Please try again later.",position:"topRight"})}};g.addEventListener("submit",S);h.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
