// counter for programming languages
  (function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});


// text anumation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["hard", "fun", "a journey", "LIFE"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});
var tabButtons=document.querySelectorAll(".tabContainer .buttonContainer button");
var tabPanels=document.querySelectorAll(".tabContainer  .tabPanel");

function showPanel(panelIndex,colorCode) {
    tabButtons.forEach(function(node){
        node.style.backgroundColor="";
        node.style.color="";
    });
    tabButtons[panelIndex].style.backgroundColor=colorCode;
    tabButtons[panelIndex].style.color="white";
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    tabPanels[panelIndex].style.display="block";
    tabPanels[panelIndex].style.backgroundColor=colorCode;
}
showPanel(0,'#000000');
(function() {
	function validEmail(email) {
	  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	  return re.test(email);
	}
  
	function validateHuman(honeypot) {
	  if (honeypot) {  //if hidden form filled up
		console.log("Robot Detected!");
		return true;
	  } else {
		console.log("Welcome Human!");
	  }
	}
  
	// get all data in form and return object
	function getFormData(form) {
	  var elements = form.elements;
  
	  var fields = Object.keys(elements).filter(function(k) {
			return (elements[k].name !== "honeypot");
	  }).map(function(k) {
		if(elements[k].name !== undefined) {
		  return elements[k].name;
		// special case for Edge's html collection
		}else if(elements[k].length > 0){
		  return elements[k].item(0).name;
		}
	  }).filter(function(item, pos, self) {
		return self.indexOf(item) == pos && item;
	  });
  
	  var formData = {};
	  fields.forEach(function(name){
		var element = elements[name];
		
		// singular form elements just have one value
		formData[name] = element.value;
  
		// when our element has multiple items, get their values
		if (element.length) {
		  var data = [];
		  for (var i = 0; i < element.length; i++) {
			var item = element.item(i);
			if (item.checked || item.selected) {
			  data.push(item.value);
			}
		  }
		  formData[name] = data.join(', ');
		}
	  });
  
	  // add form-specific values into the data
	  formData.formDataNameOrder = JSON.stringify(fields);
	  formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
	  formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
  
	  console.log(formData);
	  return formData;
	}
  
	function handleFormSubmit(event) {  // handles form submit without any jquery
	  event.preventDefault();           // we are submitting via xhr below
	  var form = event.target;
	  var data = getFormData(form);         // get the values submitted in the form
  
	  /* OPTION: Remove this comment to enable SPAM prevention, see README.md
	  if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
		return false;
	  }
	  */
  
	  if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
		var invalidEmail = form.querySelector(".email-invalid");
		if (invalidEmail) {
		  invalidEmail.style.display = "block";
		  return false;
		}
	  } else {
		disableAllButtons(form);
		var url = form.action;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		// xhr.withCredentials = true;
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			console.log(xhr.status, xhr.statusText);
			console.log(xhr.responseText);
			var formElements = form.querySelector(".form-elements")
			if (formElements) {
			  formElements.style.display = "none"; // hide form
			}
			var thankYouMessage = form.querySelector(".thankyou_message");
			if (thankYouMessage) {
			  thankYouMessage.style.display = "block";
			}
			return;
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
		}).join('&');
		xhr.send(encoded);
	  }
	}
	
	function loaded() {
	  console.log("Contact form submission handler loaded successfully.");
	  // bind to the submit event of our form
	  var forms = document.querySelectorAll("form.gform");
	  for (var i = 0; i < forms.length; i++) {
		forms[i].addEventListener("submit", handleFormSubmit, false);
	  }
	};
	document.addEventListener("DOMContentLoaded", loaded, false);
  
	function disableAllButtons(form) {
	  var buttons = form.querySelectorAll("button");
	  for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = true;
	  }
	}
  })();