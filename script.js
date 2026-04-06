<section id="members-container" class="cards" aria-label="Steering Committee Members">
</section>

<script>
fetch('SteeringBios.json')
  .then(response => response.json())
  .then(members => {
    const container = document.getElementById('members-container');

    members.forEach((member, index) => {
      // Unique IDs for ARIA
      const fullBioId = `full-bio-${index}`;
      const nameId = `member-name-${index}`;

      const card = document.createElement('section');
      card.className = 'member-card';
      card.setAttribute('aria-labelledby', nameId);

      card.innerHTML = `
        <img src="${member.headshot}" alt="${member.altText}">
        <div class="card-content">
          <h3 id="${nameId}">${member.name}</h3>
          <p class="pronouns">${member.pronouns}</p>
          <p class="title">${member.title}</p>
          <p class="short-bio">${member.shortBio}</p>
          <p id="${fullBioId}" class="full-bio" hidden>${member.fullBio}</p>
          <button class="toggle-btn" aria-expanded="false" aria-controls="${fullBioId}">Read More</button>
          <div class="links">
            ${member.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.type}</a>`).join('')}
          </div>
        </div>
      `;

      container.appendChild(card);
    });


    const toggleButtons = container.querySelectorAll(".toggle-btn");
    toggleButtons.forEach(btn => {
      const fullBio = document.getElementById(btn.getAttribute("aria-controls"));
      fullBio.hidden = true; // ensure hidden for screen readers

      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        fullBio.hidden = expanded;
        btn.textContent = expanded ? "Read More" : "Read Less";
      });
    });
  })
  .catch(err => console.error('Error loading:', err));
</script>
