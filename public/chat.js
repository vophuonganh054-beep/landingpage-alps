(() => {
 const box=document.getElementById('derma-chat-messages');
 const input=document.getElementById('derma-chat-input');
 const panel=document.getElementById('derma-chat-window');
 if(!box||!input||!panel)return;
 let busy=false, history=[];
 input.maxLength=2500;
 input.setAttribute('aria-label','Câu hỏi cho trợ lý AI ALPS');
 input.removeAttribute('onkeydown');
 input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();window.sendDermaUserMessage();}});
 box.replaceChildren();box.setAttribute('role','log');box.setAttribute('aria-live','polite');
 function bubble(text,user=false){
  const row=document.createElement('div');row.className=user?'alps-chat-row user':'alps-chat-row';
  const msg=document.createElement('div');msg.className='alps-chat-text';msg.textContent=text;row.append(msg);box.append(row);box.scrollTop=box.scrollHeight;return row;
 }
 window.appendChatMessage=bubble;
 bubble('Chào bạn! Mình là Dược Sĩ & Chuyên Viên AI của Alps Skincare Thụy Sĩ. Mình có thể tư vấn chi tiết về thành phần sản phẩm, nguồn gốc xuất xứ, cách dùng routine chuẩn Y khoa hoặc các gói ưu đãi hôm nay nhé!');
 const quick=document.createElement('div');quick.id='derma-quick-replies';quick.className='alps-chat-quick';
 ['Sản phẩm làm từ gì?','Nguồn gốc xuất xứ ở đâu?','Cách sử dụng routine ra sao?','Hiện có ưu đãi gì?','Da nhạy cảm dùng được không?','Chính sách hoàn tiền 30 ngày?'].forEach(q=>{const b=document.createElement('button');b.type='button';b.textContent=q;b.onclick=()=>send(q);quick.append(b);});box.append(quick);
 const footer=input.parentElement.parentElement;
 const branding=footer.firstElementChild;
 branding.textContent='Trợ lý AI • Gemini';branding.style.color='#795735';
 const notice=document.createElement('p');notice.className='alps-chat-notice';notice.textContent='Tin nhắn được gửi tới Google Gemini; gói miễn phí có thể dùng nội dung để cải thiện dịch vụ. Không gửi thông tin riêng tư.';footer.append(notice);
 const icons=input.nextElementSibling;
 if(icons)icons.remove();
 const sendButton=document.createElement('button');sendButton.type='button';sendButton.className='alps-chat-send';sendButton.textContent='Gửi';sendButton.setAttribute('aria-label','Gửi tin nhắn');sendButton.onclick=()=>window.sendDermaUserMessage();input.parentElement.append(sendButton);
 const menu=panel.querySelector('button[title="Menu"]');if(menu){menu.title='Cuộc trò chuyện mới';menu.querySelector('span').textContent='restart_alt';menu.setAttribute('aria-label','Cuộc trò chuyện mới');menu.onclick=()=>{if(busy)return;history=[];box.replaceChildren();bubble('Mình đã bắt đầu cuộc trò chuyện mới. Bạn muốn hỏi gì?');box.append(quick);input.focus();};}
 async function send(value,alreadyShown=false){
  const text=String(value||'').trim();if(!text||busy)return;
  if(text.length>2500){bubble('Bạn rút gọn câu hỏi dưới 2.500 ký tự nhé.');return;}
  busy=true;input.disabled=true;sendButton.disabled=true;
  if(!alreadyShown)bubble(text,true);
  input.value='';
  const thinking=bubble('ALPS đang suy nghĩ…');thinking.classList.add('alps-chat-thinking');
  const messages=[...history.slice(-10),{role:'user',text}];
  try {
   const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages}),signal:AbortSignal.timeout(45000)});
   const data=await r.json();
   if(!r.ok||!data.text)throw new Error(data.error||'Chưa nhận được phản hồi. Bạn thử lại nhé.');
   thinking.remove();bubble(data.text);
   history=[...messages,{role:'model',text:data.text.slice(0,2500)}].slice(-10);
  } catch(e){
   thinking.remove();const row=bubble(e.name==='TimeoutError'?'Kết nối mất nhiều thời gian. Bạn thử lại nhé.':e instanceof TypeError?'Không kết nối được. Bạn kiểm tra mạng rồi bấm Thử lại nhé.':e.message||'Không thể kết nối. Bạn thử lại nhé.');
   const retry=document.createElement('button');retry.type='button';retry.className='alps-chat-retry';retry.textContent='Thử lại';retry.onclick=()=>{if(!busy){row.remove();send(text,true);}};row.lastChild.append(document.createElement('br'),retry);
  }finally{busy=false;input.disabled=false;sendButton.disabled=false;input.focus();box.scrollTop=box.scrollHeight;}
 }
 window.sendDermaUserMessage=()=>send(input.value);
 window.handleQuickDermaReply=q=>send(q);
 const style=document.createElement('style');style.textContent=`
 #derma-chat-window{height:580px!important;max-height:85dvh!important;font-family:'Be Vietnam Pro',sans-serif}
 #derma-chat-window>div:first-child{background:linear-gradient(110deg,#4b2b18,#98602d)!important}
 #derma-chat-messages{background:#fffdf8!important;min-height:0;font-size:14px!important}
 .alps-chat-row{display:flex;margin:12px 0}.alps-chat-row.user{justify-content:flex-end}
 .alps-chat-text{max-width:90%;padding:12px 14px;background:#f3ece1;color:#35291e;border-radius:16px 16px 16px 4px;line-height:1.7;font-size:14px;white-space:pre-wrap;overflow-wrap:anywhere;user-select:text}
 .user .alps-chat-text{background:#704923;color:white;border-radius:16px 16px 4px 16px}
 .alps-chat-quick{display:flex;flex-wrap:wrap;gap:7px}.alps-chat-quick button{border:1px solid #cdbb9e;border-radius:16px;padding:7px 10px;color:#664525;background:white;font-size:12px;cursor:pointer}
 .alps-chat-notice{font-size:10px;line-height:1.5;color:#70675d;margin:6px 0 0}
 .alps-chat-send{background:#704923;color:white;border-radius:10px;padding:8px 13px;font-size:13px;cursor:pointer}.alps-chat-send:disabled{opacity:.5;cursor:wait}
 .alps-chat-retry{margin-top:8px;border:1px solid #987345;border-radius:8px;padding:4px 12px;color:#704923;background:white;cursor:pointer}
 .alps-chat-thinking{animation:alpsChatThinking 1.2s ease-in-out infinite}@keyframes alpsChatThinking{50%{opacity:.5}}
 #derma-chat-input{min-width:0!important;font-size:14px!important}
 `;document.head.append(style);
})();
