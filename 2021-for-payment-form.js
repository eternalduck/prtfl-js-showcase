// started on January, 5, 2021
// Toggle coupon/purchase input field
document.addEventListener("DOMContentLoaded", function () {
	let couponToggle = document.getElementById("toggle-coupon");
	let couponRemove = document.getElementById("remove-coupon");
	let couponSet = document.getElementById("coupon-set");
	let purchaseSet = document.getElementById("purchase-set");
	let countrySet = document.getElementById("country-set");
	let vatSet = document.getElementById("vat-set");

	couponToggle.addEventListener("click", function toggleCoupon() {
		couponSet.classList.toggle("d-none");
		purchaseSet.classList.toggle("d-none");
	});

	couponRemove.addEventListener("click", function toggleCoupon() {
		couponSet.classList.toggle("d-none");
		purchaseSet.classList.toggle("d-none");
	});

	// Toggle country selection when Business radio is checked
	document.getElementById("order-form").addEventListener("change",
			function toggleCountry() {
				if (document.getElementById("business").checked) {
					countrySet.classList.remove("d-none");
				} else {
					countrySet.classList.add("d-none");
				}
			});

	// Toggle VAT after certain countries selection, called from a custom select
	function toggleVat(selected) {
		let vatCountries = ["Åland Islands", "Albania"];
		if (vatCountries.indexOf(selected.dataset.value) > -1) {
			vatSet.classList.remove("d-none");
		} else {
			vatSet.classList.add("d-none");
		}
	}


// Custom select
// based on https://andrejgajdos.com/custom-select-dropdown/
	for (let option of document.querySelectorAll(".form__select-option")) {
		option.addEventListener("click", function selectOption() {
			// if (!this.classList.contains("selected")) {
			this.parentNode.querySelector(".form__select-option.selected").classList.remove("selected");
			this.classList.add("selected");
			this.closest(".form__select").querySelector(".form__select-trigger span").textContent = this.textContent;

			if (this.closest(".form__select").id === "country") {
				toggleVat(this);
			}
			// }
		})
	}
	;

	for (let dropdown of document.querySelectorAll(".form__select-wrapper")) {
		dropdown.addEventListener("click", function openSelect() {
			this.querySelector(".form__select").classList.toggle("open");
		})
	}
	;
	window.addEventListener("click", function closeSelect(e) {
		for (let select of document.querySelectorAll(".form__select")) {
			if (!select.contains(e.target)) {
				select.classList.remove("open");
			}
		}
	});
// end custom select

});//DOMContentLoaded

//////////////////////////////////////

// TMP - for demonstration purposes!
// style label of invalid input
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".form__field:invalid").forEach(function (thisField) {
		if (thisField.previousElementSibling) {
			thisField.previousElementSibling.classList.add("form__label_invalid");
		}
	});

});
document.querySelectorAll(".form__field").forEach(function toggleLabelError(thisField) {
	thisField.addEventListener("change", function () {
		if (thisField.previousElementSibling) {
			if (!thisField.validity.valid) {
				thisField.previousElementSibling.classList.add("form__label_invalid")
			} else {
				thisField.previousElementSibling.classList.remove("form__label_invalid");
			}
		}
	});
});

// disable coupon btn after applying
document.getElementById("coupon-button").addEventListener("click", function makeBtnDisabled() {
	this.classList.add("btn_inactive")
});
// end TMP
