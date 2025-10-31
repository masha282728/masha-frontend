document.addEventListener("DOMContentLoaded",()=>{
  const sections=document.querySelectorAll(".section");
  const links=document.querySelectorAll("nav a");
  const form=document.getElementById("contactForm");
  const status=document.getElementById("formStatus");
  const messagesList=document.getElementById("messagesList");
  const storageKey="masha_66766_messages";

  function showSection(id){
    sections.forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  links.forEach(link=>{
    link.addEventListener("click",(e)=>{
      e.preventDefault();
      const target=link.getAttribute("href").substring(1);
      showSection(target);
    });
  });

  showSection("about");

  function showMessages(){
    let messages=JSON.parse(localStorage.getItem(storageKey)||"[]");
    messagesList.innerHTML = messages.length
      ? messages.map(m=>`<p><b>${m.name}</b> (${m.email})<br>${m.message}<br><small>${m.time}</small></p>`).join("")
      : "<p>Brak wiadomości</p>";
  }

  showMessages();

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={name:form.name.value,email:form.email.value,message:form.message.value,time:new Date().toLocaleString("pl-PL")};
    let messages=JSON.parse(localStorage.getItem(storageKey)||"[]");
    messages.push(data);
    localStorage.setItem(storageKey,JSON.stringify(messages));
    form.reset();
    status.textContent=`Wiadomość zapisana`;
    showMessages();
    setTimeout(()=>status.textContent="",2000);
  });
});
