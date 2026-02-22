/* --- projects.js --- */

// SEARCH & FILTER LOGIC ONLY
// (Modal logic is now handled globally in script.js)

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    // Filter Function
    function filterProjects(category, searchTerm) {
        projects.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            
            // Get title for searching
            const titleEl = project.querySelector('h3');
            const projectTitle = titleEl ? titleEl.innerText.toLowerCase() : '';
            const term = searchTerm.toLowerCase();

            // Check if matches category
            const categoryMatch = category === 'all' || (projectCategory && projectCategory.includes(category));
            
            // Check if matches search term
            const searchMatch = projectTitle.includes(term);

            // Display or hide
            if (categoryMatch && searchMatch) {
                project.style.display = 'flex';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Filter Button Click Event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Run Filter
            const currentCategory = btn.getAttribute('data-filter');
            filterProjects(currentCategory, searchInput ? searchInput.value : '');
        });
    });

    // Search Input Typing Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Find which button is currently active
            const activeBtn = document.querySelector('.filter-btn.active');
            const currentCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
            
            // Run Filter
            filterProjects(currentCategory, e.target.value);
        });
    }
});