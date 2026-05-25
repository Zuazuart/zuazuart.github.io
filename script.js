const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelector(".lightbox")?.remove();
        document.body.classList.remove("no-scroll");
        navMenu?.classList.remove("active");
        hamburger?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
    }
});

document.querySelectorAll(".gallery-grid img, .image-pair img, .feature-image img").forEach((img) => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-label", "Expanded tattoo image");

        const bigImg = document.createElement("img");
        bigImg.src = img.src;
        bigImg.alt = img.alt;

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "lightbox-close";
        closeButton.textContent = "Close";
        closeButton.setAttribute("aria-label", "Close expanded image");

        overlay.append(bigImg, closeButton);
        document.body.appendChild(overlay);
        document.body.classList.add("no-scroll");

        const closeLightbox = () => {
            overlay.remove();
            document.body.classList.remove("no-scroll");
        };

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay || event.target === closeButton) {
                closeLightbox();
            }
        });
    });
});

document.querySelectorAll(".video-card").forEach((card) => {
    const video = card.querySelector(".reel-video");
    const playButton = card.querySelector(".play-pause-btn");
    const muteButton = card.querySelector(".mute-btn");
    const duration = card.querySelector(".video-duration");

    if (!video || !playButton || !muteButton || !duration) return;

    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const updateDuration = () => {
        duration.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    };

    const pauseOtherVideos = () => {
        document.querySelectorAll(".reel-video").forEach((otherVideo) => {
            if (otherVideo !== video && !otherVideo.paused) {
                otherVideo.pause();
                const otherCard = otherVideo.closest(".video-card");
                const otherButton = otherCard?.querySelector(".play-pause-btn");
                if (otherButton) otherButton.textContent = "Play";
            }
        });
    };

    const togglePlay = () => {
        if (video.paused) {
            pauseOtherVideos();
            video.play();
            playButton.textContent = "Pause";
        } else {
            video.pause();
            playButton.textContent = "Play";
        }
    };

    playButton.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("timeupdate", updateDuration);
    video.addEventListener("ended", () => {
        playButton.textContent = "Play";
        updateDuration();
    });

    muteButton.addEventListener("click", () => {
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? "Muted" : "Sound";
    });
});

document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
});

document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
        submitButton.classList.add("is-loading");
    });
});
