// script.js
// Simple accessibility helpers: smooth scroll and focus management for in-page links
document.addEventListener('DOMContentLoaded', function(){
	// Smooth scroll for same-page anchors
	document.querySelectorAll('a[href^="#"]').forEach(function(link){
		link.addEventListener('click', function(e){
			var targetId = this.getAttribute('href').slice(1);
			var target = document.getElementById(targetId);
			if(target){
				e.preventDefault();
				target.scrollIntoView({behavior:'smooth', block:'start'});
				// make focus visible for keyboard users
				target.setAttribute('tabindex','-1');
				target.focus({preventScroll:true});
			}
		});
	});
	// No responsive nav toggle needed (TOC is inline)

	// Scrollspy: highlight current section in nav
	var sections = document.querySelectorAll('main section[id]');
	var navLinks = document.querySelectorAll('.toc a');
	function onScroll(){
		var fromTop = window.scrollY + 100;
		var currentId = null;
		sections.forEach(function(section){
			if(section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop){
				currentId = section.id;
			}
		});
		navLinks.forEach(function(link){
			var href = link.getAttribute('href').slice(1);
			if(href === currentId){
				link.classList.add('active');
				link.setAttribute('aria-current','true');
			} else {
				link.classList.remove('active');
				link.removeAttribute('aria-current');
			}
		});
	}
	window.addEventListener('scroll', onScroll, {passive:true});
	onScroll();
});