"use strict";





document.addEventListener("DOMContentLoaded", function () {
  // רשימת אנשי הקשר הראשונית
 

  


 
  let contacts = [
    { id: 0, name: "גיל חדד", phone: "054-1234567", address: "רחוב קיבוץ גלויות 20", email: "gil@gmail.com", notes: "" },
    { id: 1, name: "יואב בר", phone: "054-8765432", address: "רחוב הזית 9", email: "yoav@gmail.com", notes: "" },
    { id: 2, name: "מורי וסרמן", phone: "058-7654321", address: "רחוב הרקפות 4", email: "mori@gmail.com", notes: "" },
    { id: 3, name: "רועי מזרחי", phone: "053-9876543", address: "רחוב האלון 5", email: "roei@gmail.com", notes: "" }
  ];

  const contactList = document.getElementById("contactList"); // אלמנט הרשימה של אנשי הקשר
  const searchInput = document.getElementById("search"); // שדה החיפוש
  const popupForm = document.getElementById("popupForm"); // הטופס להוספה/עדכון איש קשר
  const closeBtn = document.querySelector(".close"); // כפתור סגירת הטופס
  const contactForm = document.getElementById("contactForm"); // הטופס עצמו
  const addContactBtn = document.getElementById("addContactBtn"); // כפתור להוספת איש קשר חדש
  const deleteAllBtn = document.getElementById("deleteAllBtn"); // כפתור למחיקת כל אנשי הקשר
  const suprise = document.getElementById("suprise");
  

  
   


  // הצגת אנשי הקשר
  function renderContacts(contactArray) {
    contactList.innerHTML = ""; // מחיקה של התוכן הנוכחי ברשימה
    if (contactArray.length === 0) {
      contactList.innerHTML = "<li>אין רשומות</li>"; // אם אין אנשי קשר, תציג הודעה
      return;
    }
    
    contactArray.sort((a, b) => a.name.localeCompare(b.name)); // מיון לפי שם
    
    // מעבר על כל אנשי הקשר והוספתם לרשימה
    contactArray.forEach((contact,index) => {
      const li = document.createElement("li"); // יצירת אלמנט של איש קשר ברשימה
      li.classList.add("contact-item"); // הוספת מחלקה לעיצוב
      li.dataset.id = contact.id; // הגדרת מזהה של איש הקשר
    
      li.innerHTML = `
        <span>${contact.name} - ${contact.phone}</span>
        <div class="contact-actions">
          <button class="editBtn">עדכן</button>
          <button class="deleteBtn">מחק</button>
          <button class="infoBtn" ">פרטים נוספים</button>
        </div>
      `; // הוספת פרטי איש הקשר עם כפתורי הפעולות
    
      contactList.appendChild(li); // הוספת איש הקשר לרשימה
    });
  }

  // הצגת הטופס להוספת/עדכון איש קשר
  function showPopupForm(contact = {}) {
    document.getElementById("contactId").value = contact.id || ""; // מזהה איש הקשר אם קיים
    document.getElementById("name").value = contact.name || ""; // שם איש הקשר אם קיים
    document.getElementById("phone").value = contact.phone || ""; // טלפון איש הקשר אם קיים
    document.getElementById("address").value = contact.address || ""; // כתובת איש הקשר אם קיימת
    document.getElementById("email").value = contact.email || ""; // אימייל איש הקשר אם קיים
    document.getElementById("notes").value = contact.notes || ""; // הערות אם קיימות
    popupForm.style.display = "block"; // הצגת הטופס
  }

  // סגירת הטופס
  function closePopupForm() {
    popupForm.style.display = "none"; // הסתרת הטופס
  }

  // הוספה או עדכון איש קשר
  function addOrUpdateContact(event) {
    event.preventDefault(); // מניעת שליחת הטופס כברירת מחדל
    
    const id = document.getElementById("contactId").value; // מזהה איש הקשר
    const name = document.getElementById("name").value; // שם איש הקשר
    const phone = document.getElementById("phone").value; // טלפון איש הקשר
    const address = document.getElementById("address").value; // כתובת איש הקשר
    const email = document.getElementById("email").value; // אימייל איש הקשר
    const notes = document.getElementById("notes").value; // הערות
  

    if (phone.length > 11) {
      alert("מספר הטלפון חייב להיות עד 11 תווים!"); // בדיקה אם מספר הטלפון ארוך מדי
      return;
    }
    
    if (!email.endsWith(".com")) {
      alert("כתובת האימייל חייבת להסתיים ב-.com!"); // בדיקה אם האימייל מסתיים ב-.com
      return;
    }
    const existingContact = contacts.find(contact => (contact.email === email || contact.phone === phone || contact.name === name) && contact.id != id); // בדיקת קיום טלפון או אימייל
    
    if (existingContact) {
      alert("איש קשר עם שם או טלפון או אימייל זהה כבר קיים!"); // אם קיים איש קשר עם אותו טלפון או אימייל, הצגת הודעה
      return;
    }
    
    if (id) {
      const contactIndex = contacts.findIndex(contact => contact.id == id); // מציאת איש הקשר לעדכון
      contacts[contactIndex] = { id: Number(id), name, phone, address, email, notes }; // עדכון איש הקשר
    } else {
      const newContact = {
        id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1, // יצירת מזהה חדש לאיש הקשר
        name,
        phone,
        address,
        email,
        notes
      };
      contacts.push(newContact); // הוספת איש הקשר לרשימה
    }
    
    renderContacts(contacts); // הצגת רשימת אנשי הקשר המעודכנת
    closePopupForm(); // סגירת הטופס
  }

  // מחיקת איש קשר
  function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id); // הסרת איש הקשר מהרשימה
    renderContacts(contacts); // הצגת רשימת אנשי הקשר המעודכנת
  }

  // מחיקת כל אנשי הקשר
  function deleteAllContacts() {
    contacts = []; // מחיקת כל אנשי הקשר
    renderContacts(contacts); // הצגת רשימת אנשי הקשר הריקה
  }

  // חיפוש אנשי קשר
  function searchContacts(event) {
    const query = event.target.value.toLowerCase(); // קבלת הערך מהשדה חיפוש והפיכתו לאותיות קטנות
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query)); // סינון אנשי קשר בהתאם לשאילתת החיפוש
    renderContacts(filteredContacts); // הצגת אנשי הקשר המסוננים
  }


  function openInfo(index){

    const infoPopup =  document.getElementById('info')
   
    infoPopup.style.display = 'block'
   
    const user = contacts[index]

    
     infoPopup.querySelector('p').innerHTML = `
  
     <p>שם: ${user.name||"לא קיים"}</p>
     <p>טלפון: ${user.phone||"לא קיים"}</p>
     <p>כתובת: ${user.address||"לא קיים"}</p>
     <p>אימייל: ${user.email||"לא קיים"}</p>
     <p>הערות: ${user.notes||"לא קיים"}</p>

  
     `

  

   }


   document.getElementsByClassName('close-popup')[0].addEventListener('click',()=>{
    document.getElementById('info').style.display = 'none'
  })


  // ניהול אירועים
  contactList.addEventListener("click", function (event) {
    const contactElement = event.target.closest("li"); // מציאת אלמנט איש הקשר שלחצו עליו
    const id = contactElement.dataset.id; // קבלת המזהה של איש הקשר
    
    if (event.target.classList.contains("editBtn")) {
      const contact = contacts.find(contact => contact.id == id); // מציאת איש הקשר ברשימה
      showPopupForm(contact); // הצגת הטופס עם הפרטים של איש הקשר לעדכון
    } else if (event.target.classList.contains("deleteBtn")) {
      deleteContact(Number(id)); // מחיקת איש הקשר
    } else if (event.target.classList.contains("showBtn")) {
      toggleDetails(contactElement); // הצגת פרטים נוספים של איש הקשר
    } else if (event.target.classList.contains("infoBtn")){
      openInfo(id)
    }
  });
    
      // אירוע לחיצה על כפתור הוספת איש קשר חדש
      addContactBtn.addEventListener("click", function () {
        showPopupForm(); // הצגת הטופס להוספת איש קשר חדש
      });
      
      suprise.addEventListener("click",function(){

        if (document.getElementsByTagName('header')[0].style.background == 'black'){
          document.getElementsByTagName('header')[0].style.background = '#00b3ff';    
          document.getElementsByTagName('footer')[0].style.background = '#00b3ff';
          document.getElementsByTagName('editbtn')[0].style.background = '#00b3ff';    
          document.getElementsByTagName('li')[0].style.background = '#00b3ff';
          return
        }

      document.getElementsByTagName('header')[0].style.background = 'black';    
      document.getElementsByTagName('footer')[0].style.background = 'black';    
      document.getElementsByTagName('editbtn')[0].style.background = 'black';    
      document.getElementsByTagName('li')[0].style.background = 'black';  
      })

    
      // אירוע לחיצה על כפתור סגירת הטופס
      closeBtn.addEventListener("click", closePopupForm); // סגירת הטופס
    
      // אירוע שליחת הטופס
      contactForm.addEventListener("submit", addOrUpdateContact); // הוספה או עדכון איש קשר
    
      // אירוע חיפוש אנשי קשר
      searchInput.addEventListener("input", searchContacts); // סינון אנשי קשר בעת חיפוש
    
      // אירוע לחיצה על כפתור מחיקת כל אנשי הקשר
      deleteAllBtn.addEventListener("click", deleteAllContacts); // מחיקת כל אנשי הקשר
    
      // הוספת אפקט hover לאנשי הקשר
      contactList.addEventListener("mouseover", function (event) {
        if (event.target.closest(".contact-item")) {
          event.target.closest(".contact-item").classList.add("hover"); // הוספת מחלקה לעיצוב כשעוברים עם העכבר מעל איש קשר
        }
      });
    
      contactList.addEventListener("mouseout", function (event) {
        if (event.target.closest(".contact-item")) {
          event.target.closest(".contact-item").classList.remove("hover"); // הסרת מחלקת העיצוב כשעוזבים את אזור איש הקשר עם העכבר
        }
      });
    
      // הצגת אנשי הקשר בהתחלה
      renderContacts(contacts); // קריאה לפונקציה כדי להציג את רשימת אנשי הקשר הראשונית
    });
    function onClickInfo(){
      const div = document.getElementById("info");
      div.style.display = "block";


    }


    
