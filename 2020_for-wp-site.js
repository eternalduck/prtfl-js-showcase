// started on May, 16, 2020
// This file is compiled by gulp-babel from /src/js/custom.js for IE11 compatibility

// Globals
let scrollTop
let pageHeight
let winHeight
let winWidth
let headerHeight
let screenBottom
let goUpBtn = document.getElementById("go-up")
let videos = document.querySelectorAll(".youtube-embed")
let portfolioPage = document.getElementById("portfolio-page")
let postList = []
let portfPost
let prlxSectionsList = []
let prlxSections
let syncPipes = document.getElementById("sync-pipes")

document.addEventListener("DOMContentLoaded", function () {
	// vars for sections in view detection
	pageHeight = document.documentElement.scrollHeight
	winHeight = window.innerHeight
	winWidth = window.innerWidth
	headerHeight = document.querySelector(".header").offsetHeight

	preloader()
	if (portfolioPage) {
		createPortfSectionsList()
		lazyLoadVideo()
	}
})// DOMContentLoaded

window.addEventListener("scroll", function () {
	// vars for sections in view detection
	scrollTop = window.pageYOffset
	screenBottom = scrollTop + winHeight

	progressBar()
	revealGoUpBtn()
	addPortfolioHash()
	if (prlxSections != "") {
		parallaxShift()
	}
})// scroll

// Preloader
function preloader() {
	document.body.classList.add("loaded")
}

// Progressbar
function progressBar() {
	document.querySelector("#progress .progress__bar").style.width = scrollTop / ((pageHeight - winHeight) / 100) + "%"
}

// Go-up btn
function revealGoUpBtn() {
	if (scrollTop > winHeight / 2) {
		goUpBtn.style.opacity = 1
	} else {
		goUpBtn.style.opacity = 0
	}
}

goUpBtn.addEventListener("click", function goUp() {
	let duration = 300
	animatedScroll(duration)
})

//Animated scroll, https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
function animatedScroll(duration) {
	// cancel if already on top
	if (document.scrollingElement.scrollTop === 0) return
	const totalScrollDistance = document.scrollingElement.scrollTop
	let scrollY = totalScrollDistance, oldTimestamp = null

	function step(newTimestamp) {
		if (oldTimestamp !== null) {
			// if duration is 0 scrollY will be -Infinity
			scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration
			if (scrollY <= 0) return document.scrollingElement.scrollTop = 0
			document.scrollingElement.scrollTop = scrollY
		}
		oldTimestamp = newTimestamp
		window.requestAnimationFrame(step)
	}

	window.requestAnimationFrame(step)
}// animatedScroll
// end Go-up

// Sidebar with Menu
document.getElementById("sidebar-toggle").addEventListener("click", function toggleSidebar() {
	this.classList.toggle("toggled")
	document.getElementById("sidebar").classList.toggle("open")
})

// Detect a section in the viewport
function isInViewport(el) {
	let block = document.getElementById(el)
	let blockTopBorder = block.offsetTop
	let blockHeight = block.offsetHeight
	let blockBottomBorder = blockTopBorder + blockHeight
	return ((scrollTop > blockTopBorder - headerHeight) && (scrollTop < blockBottomBorder))
}

//////////////////////////
//PORTFOLIO
function createPortfSectionsList() {
	portfPost = [...document.querySelectorAll("section.portfolio-preview")]
	portfPost.forEach((section) => {
		if (section.id != null) {
			postList.push(section.id)
		}//if
	})
}//createPortfSectionsList


//Portfolio: Add hash to url for each post section in view
function addPortfolioHash(el) {
	postList.forEach((el) => {
		if (isInViewport(el)) {
			history.replaceState(undefined, undefined, "#" + el)
		}
	})
}//addPortfolioHash


// Lazy-load videos
// https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743
function lazyLoadVideo() {
	if (videos) {
		let videoEmbeds = [...videos]
		videoEmbeds.map((video, i) => {
			// get thumbnail
			let source = "https://img.youtube.com/vi/" + video.dataset.embed + "/sddefault.jpg"
			// load the image asynchronously
			let image = new Image()
			image.src = source
			image.addEventListener("load", function () {
				video.appendChild(image)
			}(i))

			video.addEventListener("click", function () {
				let iframe = document.createElement("iframe")
				iframe.setAttribute("frameborder", "0")
				iframe.setAttribute("allowfullscreen", "")
				iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1")

				this.innerHTML = ""
				this.appendChild(iframe)
			})//click
		})
	}
}//lazyLoadVideo

////////////////////////
// Frontpage: Disable logo link
if (document.querySelector("body.home")) {
	document.querySelector(".header__logo a").addEventListener("click", function (e) {
		e.preventDefault()
	})

}//end if Frontpage

//////////////////////
// About Us: unfold course program
if (document.getElementById("course")) {
	document.querySelector(".program-toggle").addEventListener("click", function toggleProgram() {
		this.classList.toggle('toggled')
	})
}

//////////////////////
// 404: go back link
if (document.querySelector("body.error404 ")) {
	document.getElementById("go-back").addEventListener("click", function goBack() {
		window.history.back()
	})
}

//////////////////////////
// Custom parallax
function createPrlxSectionsList() {
	prlxSections.forEach((s) => {
		if (s.id != null) {
			prlxSectionsList.push(s.id)
		}
	})
}

function parallaxShift() {
	let prlxShift
	prlxSectionsList.map((section) => {
		let parentBlock = document.getElementById(section)
		let prlxBlock = parentBlock.querySelector(".prlx")
		let blockHeight = parentBlock.offsetHeight
		let blockTopBorder = parentBlock.offsetTop
		let blockBottomBorder = blockTopBorder + blockHeight
		winWidth < 750 ?
				prlxShift = (scrollTop - blockTopBorder) / 30 :
				prlxShift = (scrollTop - blockTopBorder) / 25

		if ((scrollTop > blockTopBorder) && (scrollTop < blockBottomBorder)) {
			prlxBlock.style.transform = `translateY(${prlxShift}px)`
		}
	})//map
}// parallaxShift
