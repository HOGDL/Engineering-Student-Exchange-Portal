
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('items-container');

    
    fetch('/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(items => {
            
            container.innerHTML = '';

            if (items.length === 0) {
                container.innerHTML = '<p>No items listed yet. Be the first to list one!</p>';
                return;
            }

            
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                
                const title = document.createElement('h3');
                title.textContent = item.title; 

                
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = item.category;

                
                const price = document.createElement('p');
                price.className = 'price';
                price.textContent = parseFloat(item.price) === 0 ? 'FREE' : `${item.price} EGP`;

               
                const desc = document.createElement('p');
                desc.textContent = item.description || 'No description provided.';

                
                const contact = document.createElement('div');
                contact.className = 'contact';
                contact.textContent = `Offered by: ${item.owner_name} | Phone: ${item.owner_phone}`;

                
                card.appendChild(title);
                card.appendChild(badge);
                card.appendChild(price);
                card.appendChild(desc);
                card.appendChild(contact);

                
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading items:', error);
            container.innerHTML = '<p>Error loading items. Please try again later.</p>';
        });
});