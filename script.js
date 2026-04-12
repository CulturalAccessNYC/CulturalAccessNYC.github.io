// Fetch
fetch('SteeringBios.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('members-container');

    data.forEach((member, index) => {
      const card = document.createElement('section');
      card.className = 'member-card';
      card.setAttribute('role', 'region');
      card.setAttribute('tabindex', '0');

      // ARIA labeling
      const nameId = `member-name-${index}`;
      card.setAttribute('aria-labelledby', nameId);

      // Image
      if (member.headshot) {
        const img = document.createElement('img');
        img.src = member.headshot;
        img.alt = member.altText || member.name;
        card.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'no-photo';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.textContent = '◎';
        card.appendChild(placeholder);
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

      // Bios
      if (member.fullBio) {
        const bioContainer = document.createElement('div');
        bioContainer.className = 'bio-container';

        const bioText = document.createElement('p');
        bioText.className = 'bio-text';
        bioText.textContent = member.fullBio;
        bioText.id = `bio-${index}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-controls', bioText.id);
        toggleBtn.textContent = 'Read More';

        // Bio logic
        toggleBtn.addEventListener('click', () => {
          const isOpen = bioText.classList.contains('expanded');

          // Close bios
          document.querySelectorAll('.bio-text').forEach(b => {
            b.classList.remove('expanded');
          });

          document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.textContent = 'Read More';
            btn.setAttribute('aria-expanded', 'false');
          });

          // Open bios
          if (!isOpen) {
            bioText.classList.add('expanded');
            toggleBtn.textContent = 'Read Less';
            toggleBtn.setAttribute('aria-expanded', 'true');
          }
        });

        bioContainer.appendChild(bioText);
        bioContainer.appendChild(toggleBtn);
        content.appendChild(bioContainer);
      }

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

        content.appendChild(linksDiv);
      }

      card.appendChild(content);
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error:', err));
