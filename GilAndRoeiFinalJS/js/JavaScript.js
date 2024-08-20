"use strict";
document.addEventListener("DOMContentLoaded", function () {
  // רשימת אנשי הקשר הראשונית
  let contacts = [
    { id: 1, name: "גיל חדד", phone: "054-1234567", address: "רחוב קיבוץ גלויות 20", email: "gil@gmail.com", notes: "" },
    { id: 2, name: "מורי וסרמן ", phone: "058-7654321", address: "רחוב הרקפות 4", email: "mori@gmail.com", notes: "" },
    { id: 3, name: "יואב בר", phone: "054-8765432", address: "רחוב הזית 9", email: "yoav@gmail.com", notes: "" },
    { id: 4, name: "רועי מיזרחי", phone: "053-9876543", address: "רחוב האלון 5", email: "roei@gmail.com", notes: "" }
  ];

  const contactList = document.getElementById("contactList");
  const searchInput = document.getElementById("search");
  const popupForm = document.getElementById("popupForm");
  const closeBtn = document.querySelector(".close");
  const contactForm = document.getElementById("contactForm");
  const addContactBtn = document.getElementById("addContactBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");

  // פונקציה להצגת אנשי קשר
  function renderContacts(contactArray) {
    contactList.innerHTML = "";
    if (contactArray.length === 0) {
      contactList.innerHTML = "<li>אין רשומות</li>";
      return;
    }
    // מיון אנשי הקשר לפי שם
    contactArray.sort((a, b) => a.name.localeCompare(b.name));
    contactArray.forEach(contact => {
      const li = document.createElement("li");
      li.classList.add("contact-item");
      li.dataset.id = contact.id;
      li.innerHTML = `
              <span>${contact.name} - ${contact.phone}</span>
              <div class="contact-actions">
                  <button class="editBtn">עדכן</button>
                  <button class="deleteBtn">מחק</button>
                  <button class="showBtn">פרטים נוספים</button>
              </div>
          `;
      contactList.appendChild(li);
    });
  }

  // פונקציה להצגת הטופס להוספת/עדכון איש קשר
  function showPopupForm(contact = {}) {
    document.getElementById("contactId").value = contact.id || "";
    document.getElementById("name").value = contact.name || "";
    document.getElementById("phone").value = contact.phone || "";
    document.getElementById("address").value = contact.address || "";
    document.getElementById("email").value = contact.email || "";
    document.getElementById("notes").value = contact.notes || "";
    popupForm.style.display = "block";
  }



  // פונקציה לסגירת הטופס
  function closePopupForm() {
    popupForm.style.display = "none";
  }

  function addOrUpdateContact(event) {
    event.preventDefault();
    const id = document.getElementById("contactId").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const notes = document.getElementById("notes").value;

    // בדיקה אם מספר הטלפון הוא מעל 11 תווים
    if (phone.length > 11) {
      alert("מספר הטלפון חייב להיות עד 11 תווים!");
      return;
    }
    // בדיקה אם האימייל מסתיים ב- .com
    if (!email.endsWith(".com")) {
      alert("כתובת האימייל חייבת להסתיים ב-.com!");
      return;
    }

    // בדיקת טלפון או אימייל קיים
    const existingContact = contacts.find(contact => (contact.email === email || contact.phone === phone) && contact.id != id);

    if (existingContact) {
      alert("איש קשר עם טלפון או אימייל זהה כבר קיים!");
      return;
    }

    if (id) {
      // עדכון איש קשר קיים
      const contactIndex = contacts.findIndex(contact => contact.id == id);
      contacts[contactIndex] = { id: Number(id), name, phone, address, email, notes };
    } else {
      // הוספת איש קשר חדש
      const newContact = {
        id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
        name,
        phone,
        address,
        email,
        notes
      };
      contacts.push(newContact);
    }
    renderContacts(contacts);
    closePopupForm();
  }





  // פונקציה למחיקת איש קשר
  function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    renderContacts(contacts);
  }

  // פונקציה למחיקת כל אנשי הקשר
  function deleteAllContacts() {
    contacts = [];
    renderContacts(contacts);
  }

  // פונקציה לחיפוש אנשי קשר
  function searchContacts(event) {
    const query = event.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
    renderContacts(filteredContacts);
  }
  /*
    // אירועי לחיצה על כפתורי העריכה והמחיקה
    contactList.addEventListener("click", function (event) {
      if (event.target.classList.contains("editBtn")) {
        const id = event.target.closest("li").dataset.id;
        const contact = contacts.find(contact => contact.id == id);
        showPopupForm(contact);
      } else if (event.target.classList.contains("deleteBtn")) {
        const id = event.target.closest("li").dataset.id;
        deleteContact(Number(id));
      }
    });
  */

  // אירועי לחיצה על כפתורי העריכה, המחיקה ופרטים נוספים
  contactList.addEventListener("click", function (event) {
    const contactElement = event.target.closest("li");
    const id = contactElement.dataset.id;
    const contact = contacts.find(contact => contact.id == id);

    if (event.target.classList.contains("editBtn")) {
      showPopupForm(contact);
    } else if (event.target.classList.contains("deleteBtn")) {
      deleteContact(Number(id));
    } else if (event.target.classList.contains("showBtn")) {
      toggleDetails(contactElement, contact);
    }
  });

  // פונקציה להצגת או הסתרת פרטים נוספים
  function toggleDetails(contactElement, contact) {
    let detailsElement = contactElement.querySelector(".contact-details");

    // אם האלמנט לפרטים נוספים כבר קיים, נסגור אותו
    if (detailsElement) {
      detailsElement.remove();
    } else {
      // יצירת אלמנט להצגת הפרטים
      detailsElement = document.createElement("div");
      detailsElement.classList.add("contact-details");
      detailsElement.innerHTML = `
      <p><strong>כתובת:</strong> ${contact.address}</p>
      <p><strong>אימייל:</strong> ${contact.email}</p>
      <p><strong>הערות:</strong> ${contact.notes}</p>
    `;
      contactElement.appendChild(detailsElement);
    }
  }


  // אירוע לחיצה על כפתור הוספת איש קשר
  addContactBtn.addEventListener("click", function () {
    showPopupForm();
  });

  // אירוע לחיצה על כפתור סגירת הטופס
  closeBtn.addEventListener("click", closePopupForm);

  // אירוע שליחת הטופס
  contactForm.addEventListener("submit", addOrUpdateContact);

  // אירוע חיפוש אנשי קשר
  searchInput.addEventListener("input", searchContacts);

  // אירוע לחיצה על כפתור מחיקת כל אנשי הקשר
  deleteAllBtn.addEventListener("click", deleteAllContacts);

  // הוספת אפקט hover לאנשי הקשר
  contactList.addEventListener("mouseover", function (event) {
    if (event.target.closest(".contact-item")) {
      event.target.closest(".contact-item").classList.add("hover");
    }
  });

  contactList.addEventListener("mouseout", function (event) {
    if (event.target.closest(".contact-item")) {
      event.target.closest(".contact-item").classList.remove("hover");
    }
  });

  // הצגת אנשי הקשר בהתחלה
  renderContacts(contacts);
});
