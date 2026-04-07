// Fetch and render member cards
fetch('SteeringBios.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('members-container');

    data.forEach((member, index) => {
      const card = document.createElement('section');
      card.className = 'member-card';
      card.setAttribute('role', 'region');
      card.setAttribute('tabindex', '0');

      const nameId = `member-name-${index}`;
      card.setAttribute('aria-labelledby', nameId);

      // Image
      if (member.headshot) {
        const img = document.createElement('img');
        img.src = member.headshot;
        img.alt = member.altText || member.name;
        card.appendChild(img);
      }

      // Content container
      const content = document.createElement('div');
      content.className = 'card-content';

      // Name
      const nameEl = document.createElement('h3');
      nameEl.id = nameId;
      nameEl.textContent = member.name;
      content.appendChild(nameEl);

      // Pronouns
      if (member.pronouns) {
        const pronounsEl = document.createElement('div');
        pronounsEl.className = 'pronouns';
        pronounsEl.textContent = member.pronouns;
        content.appendChild(pronounsEl);
      }

      // Title
      if (member.title) {
        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.textContent = member.title;
        content.appendChild(titleEl);
      }

      // Short bio
      if (member.shortBio) {
        const shortBioEl = document.createElement('div');
        shortBioEl.className = 'short-bio';
        shortBioEl.textContent = member.shortBio;
        content.appendChild(shortBioEl);
      }

      // Full bio (hidden)
      let fullBioEl = null;
      if (member.fullBio) {
        fullBioEl = document.createElement('div');
        fullBioEl.className = 'full-bio';
        fullBioEl.textContent = member.fullBio;
        fullBioEl.id = `full-bio-${index}`;
        content.appendChild(fullBioEl);
      }

      // Footer
      const footer = document.createElement('div');
      footer.className = 'card-footer';

      // Links
      if (member.links && member.links.length) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'links';

        member.links.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url || '#';
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = link.type;
          linksDiv.appendChild(a);
        });

        footer.appendChild(linksDiv);
      }

      // Toggle button
      if (fullBioEl) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-controls', fullBioEl.id);
        toggleBtn.id = `toggle-btn-${index}`;
        toggleBtn.textContent = 'Read More';

        toggleBtn.addEventListener('click', () => {
          const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
          toggleBtn.setAttribute('aria-expanded', String(!expanded));
          fullBioEl.style.display = expanded ? 'none' : 'block';
          toggleBtn.textContent = expanded ? 'Read More' : 'Read Less';
        });

        footer.appendChild(toggleBtn);
      }

      content.appendChild(footer);

      // Assemble card
      card.appendChild(content);
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error:', err));
