// Repairs for the original Stitch export. Checkout remains a local demonstration. Chat is handled by chat.js.
const form=document.getElementById('main-checkout-form');
const note=document.createElement('p');note.id='demo-note';note.textContent='Bản trải nghiệm • Đơn hàng chưa được gửi đến ALPS.';if(form)form.prepend(note);
const summary=document.createElement('div');summary.id='order-summary';const btnSubmit=document.getElementById('btn-submit-order');if(btnSubmit)btnSubmit.before(summary);
const selector=document.getElementById('package-selector');
function updateSummary(){const prices={'1':390000,'2':720000,'3':990000};if(summary&&selector)summary.textContent='Giá gói đã chọn: '+new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(prices[selector.value]||0);}
if(selector)selector.addEventListener('change',updateSummary);updateSummary();
const oldSelect=window.selectPackage;window.selectPackage=function(v){if(typeof oldSelect==='function')oldSelect(v);updateSummary();if(typeof updateMobileStickyBar==='function')updateMobileStickyBar();};
const oldApply=window.applyWelcomeVoucher;window.applyWelcomeVoucher=function(){if(typeof oldApply==='function')oldApply();updateSummary();if(typeof updateMobileStickyBar==='function')updateMobileStickyBar();};
const phone=document.getElementById('checkout-phone');if(phone){phone.pattern='(?:0|\\+84)[0-9\\s]{9,12}';phone.title='Vui lòng nhập số điện thoại Việt Nam hợp lệ';phone.autocomplete='tel';}
const fullnameInput=document.getElementById('checkout-fullname');if(fullnameInput)fullnameInput.autocomplete='name';
const addressInput=document.getElementById('checkout-address');if(addressInput)addressInput.autocomplete='street-address';
window.handleOrderSubmit=function(e){e.preventDefault();if(!form?.reportValidity())return false;if(typeof openOrderSuccessModal==='function')openOrderSuccessModal();return false;};
document.querySelectorAll('label').forEach(l=>{const el=l.parentElement.querySelector('input,select,textarea');if(el?.id)l.htmlFor=el.id;});
let lastFocused=null;document.addEventListener('click',e=>{if(e.target.closest('[onclick*="open"]'))lastFocused=e.target.closest('button,a');});
document.addEventListener('keydown',e=>{const visible=[...document.querySelectorAll('[role=dialog]')].filter(m=>m.style.display!=='none'&&!m.classList.contains('hidden'));const modal=visible.at(-1);if(!modal)return;if(e.key==='Escape'){visible.forEach(m=>{m.style.display='none';m.classList.add('hidden')});document.body.style.overflow='';lastFocused?.focus();}if(e.key==='Tab'){const els=[...modal.querySelectorAll('button,a,input,select,textarea')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!els.length)return;const first=els[0],last=els.at(-1);if(e.shiftKey&&(document.activeElement===first||!modal.contains(document.activeElement))){e.preventDefault();last.focus()}else if(!e.shiftKey&&(document.activeElement===last||!modal.contains(document.activeElement))){e.preventDefault();first.focus()}}});
window.appendChatMessage=function(text,isUser){const box=document.getElementById('derma-chat-messages');if(!box)return;const row=document.createElement('div');row.className=isUser?'flex justify-end':'flex justify-start';const msg=document.createElement('div');msg.className=isUser?'bg-primary text-white rounded-2xl p-3 text-xs max-w-[85%]':'bg-surface-container-low border border-outline-variant/30 rounded-2xl p-3 text-xs max-w-[85%]';msg.textContent=text;row.append(msg);box.append(row);box.scrollTop=box.scrollHeight;};
window.handleSupportAction=function(action){if(action==='thumbs_up')appendChatMessage('👍',true);if(action==='sentiment_satisfied'){const inp=document.getElementById('derma-chat-input');if(inp){inp.value+=' 😊';inp.focus();}}if(action==='attach_file')appendChatMessage('Để gửi ảnh cho ALPS, hãy mở liên kết Tư Vấn Facebook ở trên.',false);};
const quick=document.getElementById('derma-quick-replies');if(quick)quick.style.display='flex';
const menu=document.querySelector('#derma-chat-window button[title="Menu"]');if(menu)menu.onclick=()=>{quick.style.display=quick.style.display==='none'?'flex':'none';quick.scrollIntoView({block:'nearest'})};

// Mobile Sticky Purchase Bar System
const stickyBar = document.createElement('div');
stickyBar.id = 'alps-mobile-sticky-bar';
stickyBar.innerHTML = `
  <div class="mobile-bar-info">
    <div class="mobile-bar-tag">
      <span class="material-symbols-outlined" style="font-size:14px;color:#f87171">local_fire_department</span>
      <span id="mobile-bar-pkg-name">Combo Best-Seller (2 Món)</span>
    </div>
    <div class="mobile-bar-price" id="mobile-bar-price-val">720.000₫</div>
  </div>
  <a href="#order-form" class="mobile-bar-btn" id="mobile-bar-cta-btn">
    <span>Đặt Hàng Ngay</span>
    <span>↗</span>
  </a>
`;
document.body.appendChild(stickyBar);

const pkgNames = {
  '1': 'Gói Trải Nghiệm 30ml',
  '2': 'Combo Best-Seller (2 Món)',
  '3': 'Combo Toàn Diện (3 Món)',
};

function updateMobileStickyBar() {
  const currentVal = selector?.value || '2';
  const prices = { '1': 390000, '2': 720000, '3': 990000 };
  const priceVal = prices[currentVal] || 720000;
  const nameVal = pkgNames[currentVal] || 'Combo Ưu Đãi';

  const nameEl = document.getElementById('mobile-bar-pkg-name');
  const priceEl = document.getElementById('mobile-bar-price-val');
  if (nameEl) nameEl.textContent = nameVal;
  if (priceEl) priceEl.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal);
}

if (selector) selector.addEventListener('change', updateMobileStickyBar);
updateMobileStickyBar();

const ctaBtn = document.getElementById('mobile-bar-cta-btn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (typeof scrollToOrderFormAndFocus === 'function') {
      scrollToOrderFormAndFocus();
    } else {
      const orderSec = document.getElementById('order-form');
      orderSec?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

window.addEventListener('scroll', function() {
  if (window.innerWidth > 768) {
    stickyBar.classList.remove('visible');
    return;
  }
  const scrollY = window.scrollY;
  const orderForm = document.getElementById('order-form');
  const orderRect = orderForm?.getBoundingClientRect();

  if (scrollY > 350 && (!orderRect || orderRect.top > window.innerHeight || orderRect.bottom < 100)) {
    stickyBar.classList.add('visible');
  } else {
    stickyBar.classList.remove('visible');
  }
}, { passive: true });
