document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("contactForm");
  const status=document.getElementById("formStatus");
  const storageKey="masha_66766_messages";
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={name:form.name.value,email:form.email.value,message:form.message.value,time:new Date().toLocaleString("pl-PL")};
    let messages=JSON.parse(localStorage.getItem(storageKey)||"[]");
    messages.push(data);
    localStorage.setItem(storageKey,JSON.stringify(messages));
    form.reset();
    status.textContent=`Wiadomość zapisana lokalnie. Liczba wiadomości: ${messages.length}`;
    setTimeout(()=>status.textContent="",3000);
  });
});
