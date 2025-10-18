const projectGalleries = {
  AIS: [
    "images/AIS1.jpg",
    "images/AIS2.jpg",
    "images/AIS3.jpg",
    "images/AIS4.png",
    "images/AIS5.png",
  ],
  TA: [
    "images/TA-dashboard.png",
    "images/TA1.jpeg",
    "images/TA2.jpeg",
    "images/TA3.jpeg",
    "images/TA4.png",
    "images/TA5.jpeg",
    "images/TA6.png",
    "images/TA7.png",
  ],
}

let currentGallery = null
let currentImageIndex = 0

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
        console.log("[v0] Scrolling to section:", targetId)
      }
    })
  })

  const contactBtn = document.querySelector(".hero .btn")
  if (contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
        console.log("[v0] Scrolling to contact section")
      }
    })
  }

  // Event listener untuk klik pada project images
  document.querySelectorAll(".clickable-image img").forEach((image) => {
    image.addEventListener("click", function () {
      const projectCard = this.closest(".project-card")
      const projectId = projectCard.getAttribute("data-project")

      console.log("[v0] Clicked project:", projectId)
      console.log("[v0] Available galleries:", Object.keys(projectGalleries))

      if (projectGalleries[projectId]) {
        currentGallery = projectGalleries[projectId]
        currentImageIndex = 0
        openGallery()
        console.log("[v0] Gallery opened for project:", projectId)
        console.log("[v0] Gallery images:", currentGallery)
      } else {
        console.log("[v0] No gallery found for project:", projectId)
      }
    })
  })

  const closeBtn = document.querySelector(".gallery-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", closeGallery)
  }

  const prevBtn = document.querySelector(".gallery-prev")
  if (prevBtn) {
    prevBtn.addEventListener("click", prevImage)
  }

  const nextBtn = document.querySelector(".gallery-next")
  if (nextBtn) {
    nextBtn.addEventListener("click", nextImage)
  }

  const modal = document.getElementById("galleryModal")
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeGallery()
      }
    })
  }

  document.addEventListener("keydown", (e) => {
    if (!currentGallery) return

    if (e.key === "ArrowLeft") {
      prevImage()
    } else if (e.key === "ArrowRight") {
      nextImage()
    } else if (e.key === "Escape") {
      closeGallery()
    }
  })
})

function openGallery() {
  const modal = document.getElementById("galleryModal")
  console.log("[v0] Modal element:", modal)
  modal.classList.add("active")
  updateGalleryImage()
}

function closeGallery() {
  const modal = document.getElementById("galleryModal")
  modal.classList.remove("active")
  currentGallery = null
  currentImageIndex = 0
}

function updateGalleryImage() {
  if (!currentGallery) return

  const galleryImage = document.getElementById("galleryImage")
  const currentImageSpan = document.getElementById("currentImage")
  const totalImagesSpan = document.getElementById("totalImages")

  galleryImage.src = currentGallery[currentImageIndex]
  currentImageSpan.textContent = currentImageIndex + 1
  totalImagesSpan.textContent = currentGallery.length

  console.log("[v0] Updated gallery image:", currentGallery[currentImageIndex])
}

function prevImage() {
  if (!currentGallery) return
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length
  updateGalleryImage()
}

function nextImage() {
  if (!currentGallery) return
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length
  updateGalleryImage()
}
