document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE LOGIC ---
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    const profileImg = document.getElementById('profile-img');
    const heroDoodleImg = document.getElementById('hero-doodle-img');
    const socialIcons = document.querySelectorAll('.social-icon');

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateAssets('dark');
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'light');
            updateAssets('light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
            updateAssets('dark');
        }
    });

    function updateAssets(theme) {
        if (profileImg) {
            profileImg.src = theme === 'dark' ? 'assets/homedark.png' : 'assets/homelight.png';
        }
        if (heroDoodleImg) {
            heroDoodleImg.src = theme === 'dark' ? 'assets/doodledark.png' : 'assets/doodlelight.png';
        }
        socialIcons.forEach(icon => {
            let currentSrc = icon.getAttribute('src');
            if (theme === 'dark') {
                if (currentSrc.includes('socialslight')) {
                    icon.src = currentSrc.replace('socialslight', 'socialsdark');
                }
            } else {
                if (currentSrc.includes('socialsdark')) {
                    icon.src = currentSrc.replace('socialsdark', 'socialslight');
                }
            }
        });

        const aboutHeroImg = document.getElementById('about-hero-img');
        if (aboutHeroImg) {
            aboutHeroImg.src = theme === 'dark' ? 'assets/aboutdark.png' : 'assets/aboutlight.png';
        }
        const contactDoodleImg = document.getElementById('contact-doodle-img');
        if (contactDoodleImg) {
            contactDoodleImg.src = theme === 'dark' ? 'assets/doodledark.png' : 'assets/doodlelight.png';
        }
        const resumeHeroImg = document.getElementById('resume-hero-img');
        if (resumeHeroImg) {
            resumeHeroImg.src = theme === 'dark' ? 'assets/homedark.png' : 'assets/homelight.png';
        }
    }

    // --- HAMBURGER MENU LOGIC ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // --- BACK TO TOP LOGIC ---
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- MODAL POP-UP LOGIC WITH IMAGES, PURPOSE & APK ---
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const projectCards = document.querySelectorAll(".project-card");

    if (modal && projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener("click", () => {
                // Fetch data from HTML
                const title = card.getAttribute("data-title");
                const role = card.getAttribute("data-role");
                const purpose = card.getAttribute("data-purpose");
                const features = card.getAttribute("data-features");
                const tools = card.getAttribute("data-tools");
                
                const img1 = card.getAttribute("data-img1");
                const img2 = card.getAttribute("data-img2");
                
                const live = card.getAttribute("data-live");
                const repo = card.getAttribute("data-repo");
                const figma = card.getAttribute("data-figma");
                const apk = card.getAttribute("data-apk"); // Fetches the APK link if it exists

                // Inject text data
                document.getElementById("modal-title").innerText = title;
                document.getElementById("modal-role").innerText = role;
                document.getElementById("modal-purpose").innerText = purpose;
                document.getElementById("modal-features").innerText = features;
                document.getElementById("modal-tools").innerText = tools;

                // Inject images and handle missing second image
                document.getElementById("modal-img-1").src = img1;
                const modalImg2 = document.getElementById("modal-img-2");
                if (img2 && img2 !== "") {
                    modalImg2.src = img2;
                    modalImg2.style.display = "block";
                } else {
                    modalImg2.style.display = "none"; // Hides broken image icon if no 2nd photo
                }

                // Build links dynamically
                let linksHTML = "";
                if (live) linksHTML += `<a href="${live}" target="_blank" class="btn btn-primary" style="margin-right:0;">Live Demo</a>`;
                if (apk) linksHTML += `<a href="${apk}" download class="btn btn-primary" style="margin-right:0;">Download APK</a>`;
                if (repo) linksHTML += `<a href="${repo}" target="_blank" class="btn btn-outline" style="margin-right:0;">GitHub</a>`;
                if (figma) linksHTML += `<a href="${figma}" target="_blank" class="btn btn-outline" style="margin-right:0;">Figma</a>`;
                
                document.getElementById("modal-links").innerHTML = linksHTML;

                // Disable background scrolling when modal is open
                document.body.style.overflow = "hidden";
                
                // Show modal with animation
                modal.classList.add("show");
            });
        });

        // Close modal functions
        const closeModal = () => {
            modal.classList.remove("show");
            document.body.style.overflow = "auto"; // Re-enable scrolling
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", closeModal);
        }

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ... all your other theme/modal code ...

    // --- NETLIFY FORM SUCCESS POPUP ---
    const contactForm = document.querySelector("form[name='contact']");
    const successPopup = document.getElementById("success-popup");
    const closePopupBtn = document.getElementById("close-popup");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("Form submitted!"); // Check your console (F12) for this

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Netlify received the data! Showing popup...");
                    if (successPopup) {
                        successPopup.classList.add("show");
                        // Safety check: force display if CSS is being stubborn
                        successPopup.style.display = "flex"; 
                    }
                    contactForm.reset();
                } else {
                    console.error("Netlify response error:", response.status);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
        });
    }

    if (closePopupBtn && successPopup) {
        closePopupBtn.addEventListener("click", () => {
            successPopup.classList.remove("show");
            successPopup.style.display = "none";
        });
    }
});