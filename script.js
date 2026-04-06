fetch('SteeringBios.json')
  .then(res => res.json())
  .then(members => {
    const container = document.getElementById('members-container');

    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';

      const linksHTML = (member.links || [])
        .map(link => {
          if (!link.url) return '';
          return `<a href="${link.url}" target="_blank">${link.type || 'Link'}</a>`;
        })
        .join(' ');

    
      const image = member.headshot && member.headshot !== ''
        ? member.headshot
        : 'images/default.jpg';

      card.innerHTML = `
        <img src="${image}" alt="${member.altText || 'Profile photo'}">
        <div class="card-content">
          <h3>${member.name || ''}</h3>
          <p class="title">${member.title || ''}</p>
          <p class="pronouns">${member.pronouns || ''}</p>
          <p class="short-bio">${member.shortBio || ''}</p>
          
          <div class="links">
            ${linksHTML}
          </div>

          <button class="toggle-btn">Read More</button>
          <p class="full-bio">${member.fullBio || ''}</p>
        </div>
      `;

      container.appendChild(card);
    });


    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bio = btn.nextElementSibling;

        if (bio.style.display === 'block') {
          bio.style.display = 'none';
          btn.textContent = 'Read More';
        } else {
          bio.style.display = 'block';
          btn.textContent = 'Show Less';
        }
      });
    });
  })
  .catch(err => console.error('Error loading:', err));
