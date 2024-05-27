/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*----------------New JAvaScript codes.------------------------------ */
		// Smooth scrolling for internal links
		$(document).ready(function() {
			$('a[href*="#"]').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top
			}, 500, 'linear');
			});
		
			// Toggle sidebar on hamburger menu click
			$("#headerToggle .toggle").on("click", function() {
			$("body").toggleClass("header-visible");
			});
		});
		
		// Skill bar fill based on data-level attribute
		document.addEventListener("DOMContentLoaded", function() {
			var skills = document.querySelectorAll('.skill');
			skills.forEach(function(skill) {
			var level = skill.getAttribute('data-level');
			var barFill = skill.querySelector('.bar-fill');
			if (barFill) {
				barFill.style.width = (level * 20) + '%';
			}
			});
		});
		
		// Dark mode toggle
		document.addEventListener('DOMContentLoaded', function() {
			const toggleButton = document.getElementById('dark-mode-toggle');
			const darkModeStatus = document.getElementById('dark-mode-status');
		
			function updateDarkModeStatus() {
			if (document.body.classList.contains('dark-mode')) {
				darkModeStatus.textContent = 'ON';
			} else {
				darkModeStatus.textContent = 'OFF';
			}
			}
		
			toggleButton.addEventListener('click', function() {
			document.body.classList.toggle('dark-mode');
			// Save the mode to local storage
			if (document.body.classList.contains('dark-mode')) {
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'light');
			}
			updateDarkModeStatus();
			});
		
			// Load the saved mode from local storage
			if (localStorage.getItem('theme') === 'dark') {
			document.body.classList.add('dark-mode');
			}
			updateDarkModeStatus();
		});


/*----------------------------------------------------------------------------------------- */	
	document.addEventListener("DOMContentLoaded", function() {
		// Dropdown toggle for About page
		const aboutLink = document.getElementById("about-link");
		const aboutDropdown = aboutLink ? aboutLink.nextElementSibling : null;
	
		if (aboutLink && aboutDropdown) {
			aboutLink.addEventListener("click", function(event) {
				event.preventDefault();
				aboutDropdown.style.display = aboutDropdown.style.display === "block" ? "none" : "block";
			});
	
			document.addEventListener("click", function(event) {
				if (!aboutLink.contains(event.target) && !aboutDropdown.contains(event.target)) {
					aboutDropdown.style.display = "none";
				}
			});
		}
	
		// Dropdown toggle for Portfolio page
		const portfolioMainLink = document.getElementById("portfolio-main-link");
		const portfolioToggleLink = document.getElementById("portfolio-toggle-link");
		const portfolioDropdown = portfolioToggleLink ? portfolioToggleLink.nextElementSibling : null;
	
		if (portfolioMainLink) {
			portfolioMainLink.addEventListener("click", function(event) {
				if (!portfolioMainLink.classList.contains("active")) {
					window.location.href = "portfolio.html"; // Redirect to main Portfolio page
				}
			});
		}
	
		if (portfolioToggleLink && portfolioDropdown) {
			portfolioToggleLink.addEventListener("click", function(event) {
				event.preventDefault();
				portfolioDropdown.style.display = portfolioDropdown.style.display === "block" ? "none" : "block";
			});
	
			document.addEventListener("click", function(event) {
				if (!portfolioToggleLink.contains(event.target) && !portfolioDropdown.contains(event.target)) {
					portfolioDropdown.style.display = "none";
				}
			});
		}
	
		// Set active class for the current page link
		const currentPage = window.location.pathname.split('/').pop();
		const navLinks = document.querySelectorAll('#nav ul li a');
		navLinks.forEach(link => {
			if (link.getAttribute('href') === currentPage) {
				link.classList.add('active');
			}
		});
	});

/*------------------------------------- */



(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);