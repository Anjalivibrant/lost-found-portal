import { db, storage } from './firebase-config.js';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

const itemsCol = collection(db, "items");

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("itemForm")) {
    document.getElementById("itemForm").addEventListener("submit", addItem);
  }
  if(document.getElementById("filter")) {
    document.getElementById("filter").addEventListener("change", loadItems);
    loadItems();
  }
});

async function addItem(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const contact = document.getElementById("contact").value;
  const type = document.getElementById("type").value;
  const photoFile = document.getElementById("photo").files[0];

  const photoRef = ref(storage, `items/${Date.now()}-${photoFile.name}`);
  await uploadBytes(photoRef, photoFile);
  const photoUrl = await getDownloadURL(photoRef);

  await addDoc(itemsCol, {
    title, description, contact, type, photoUrl,
    claimed: false,
    timestamp: new Date()
  });

  alert("Item posted successfully!");
  window.location.href = "index.html";
}

async function loadItems() {
  const filter = document.getElementById("filter").value;
  let q = itemsCol;
  if(filter !== "all") {
    q = query(itemsCol, where("type", "==", filter));
  }

  const itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = "<p>Loading...</p>";

  const snapshot = await getDocs(q);
  let html = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    html += `<div class="item-card">
      <img src="${data.photoUrl}" alt="item photo">
      <div class="details">
        <strong>${data.title}</strong> 
        <span>(${data.type})</span><br>
        <p>${data.description}</p>
        <p>Contact: ${data.contact}</p>
        ${data.claimed 
          ? "<p class='claimed'>✅ Claimed</p>"
          : `<button class="claim-btn" data-id="${docSnap.id}">Mark as Claimed</button>`
        }
      </div>
    </div>`;
  });
  itemsDiv.innerHTML = html || "<p>No items found.</p>";

  document.querySelectorAll(".claim-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await updateDoc(doc(db, "items", id), { claimed: true });
      alert("Item marked as claimed!");
      loadItems();
    });
  });
}
