jQuery(document).ready(function () {
//get prices from the array
	var dataQualityGood = calcPrices.data_quality_good;
	var dataQualityBad = calcPrices.data_quality_bad;
	var subsysTaxTypical = calcPrices.subsys_tax_typical;
	var subsysTaxAdv = calcPrices.subsys_tax_adv;
	var subsysSalesTypical = calcPrices.subsys_sales_typical;
	var subsysSalesAdv = calcPrices.subsys_sales_adv;
	var subsysProdTypical = calcPrices.subsys_prod_typical;
	var subsysProdAdv = calcPrices.subsys_prod_adv;
	var subsysPlanTypical = calcPrices.subsys_plan_typical;
	var subsysPlanAdv = calcPrices.subsys_plan_adv;
//local  vars for calculations
	var s_entSrvTotal = 0;
	var s_entUsers = 0;
	var s_dataQuality = 0;
	var s_reportsNum = 0;
	var s_reportsVal = 0;
	var s_reportsTotal = 0;
	var s_formsNum = 0;
	var s_formsVal = 0;
	var s_formsTotal = 0;
	var s_subsysTax = 0;
	var s_subsysSales = 0;
	var s_subsysProd = 0;
	var s_subsysPlan = 0;

//populating step values
	var s_dataQualityStep = parseInt((dataQualityBad - dataQualityGood) / 9);
	var s_subsysTaxStep = parseInt((subsysTaxAdv - subsysTaxTypical) / 2);
	var s_subsysSalesStep = parseInt((subsysSalesAdv - subsysSalesTypical) / 2);
	var s_subsysProdStep = parseInt((subsysProdAdv - subsysProdTypical) / 2);
	var s_subsysPlanStep = parseInt((subsysPlanAdv - subsysPlanTypical) / 2);
	jQuery('#data_quality').attr('step', s_dataQualityStep);
	jQuery('#subsys_tax').attr('step', s_subsysTaxStep);
	jQuery('#subsys_sales').attr('step', s_subsysSalesStep);
	jQuery('#subsys_prod').attr('step', s_subsysProdStep);
	jQuery('#subsys_plan').attr('step', s_subsysPlanStep);

	//enabling 1st block
	jQuery('#ent_mngmnt').click(function () {
		if (jQuery(this).is(':checked')) {
			jQuery('input[name="users"]').attr('disabled', false);
			jQuery('.users-num').css({
				'opacity': '1'
			});

		} else {
			jQuery('input[name="users"]').attr('disabled', true);
			jQuery('.users-num').css({
				'opacity': '0.5'
			});
		}
	});

	jQuery('#calc').click(function () {

		if (jQuery('#ent_mngmnt').is(':checked') && jQuery('input[name="users"]').is(':checked')) {
			s_entUsers = parseInt(jQuery('input[name="users"]:checked').val());
		} else if (jQuery('#ent_mngmnt').is(':checked')) {
			s_entUsers = parseInt(jQuery('#ent_mngmnt_10').val());
		} else {
			s_entUsers = 0;
		}

		if (jQuery('#ent_srv').is(':checked')) {
			s_entSrvTotal = parseInt(jQuery('#ent_srv').val());
		} else {
			s_entSrvTotal = 0;
		}

		s_entSrvTotal = s_entSrvTotal + s_entUsers;
		jQuery('#users_total').text('ent & srv total: ' + s_entSrvTotal + '(users: ' + s_entUsers + ')');


		//data qual
		s_dataQuality = parseInt(jQuery('#data_quality').val());
		jQuery('#quality_total').text('data quality: ' + s_dataQuality);


		//reports
		s_reportsNum = parseInt(jQuery('#reports_number').val());
		s_reportsVal = parseInt(jQuery('input[name="reports"]:checked').val());
		if (jQuery('input[name="reports"]').is(':checked')) {
			s_reportsTotal = s_reportsNum * s_reportsVal;
		} else {
			s_reportsTotal = 0;
		}
		jQuery('#reports_total').text('reports number: ' + s_reportsNum + ' | reports total: ' + s_reportsTotal);


		//forms
		s_formsNum = parseInt(jQuery('#forms_number').val());
		s_formsVal = parseInt(jQuery('input[name="forms"]:checked').val());
		if (jQuery('input[name="forms"]').is(':checked')) {
			s_formsTotal = s_formsNum * s_formsVal;
		} else {
			s_formsTotal = 0;
		}
		jQuery('#forms_total').text('forms number: ' + s_formsNum + ' | forms total: ' + s_formsTotal);

		//sub sys

		if (jQuery('#sybsys_tax_on').is(':checked')) {
			s_subsysTax = parseInt(jQuery('#subsys_tax').val());
			jQuery('#subsys_tax').attr('disabled', false);
		} else {
			s_subsysTax = 0;
			jQuery('#subsys_tax').attr('disabled', true);
		}
		jQuery('#tax_total').text('subsys tax: ' + s_subsysTax);

		if (jQuery('#subsys_sales_on').is(':checked')) {
			s_subsysSales = parseInt(jQuery('#subsys_sales').val());
			jQuery('#subsys_sales').attr('disabled', false);
		} else {
			s_subsysSales = 0;
			jQuery('#subsys_sales').attr('disabled', true);
		}
		jQuery('#sales_total').text('subsys sales: ' + s_subsysSales);

		if (jQuery('#subsys_prod_on').is(':checked')) {
			s_subsysProd = parseInt(jQuery('#subsys_prod').val());
			jQuery('#subsys_prod').attr('disabled', false);
		} else {
			s_subsysProd = 0;
			jQuery('#subsys_prod').attr('disabled', true);
		}
		jQuery('#prod_total').text('subsys prod: ' + s_subsysProd);

		if (jQuery('#subsys_plan_on').is(':checked')) {
			s_subsysPlan = parseInt(jQuery('#subsys_plan').val());
			jQuery('#subsys_plan').attr('disabled', false);
		} else {
			s_subsysPlan = 0;
			jQuery('#subsys_plan').attr('disabled', true);
		}
		jQuery('#plan_total').text('subsys prod: ' + s_subsysPlan);

	}); //end #calc mouseenter


	//total
	jQuery('#calcTotal').click(function () {
		var s_calcTotal = parseInt(s_entSrvTotal + s_dataQuality + s_reportsTotal + s_formsTotal + s_subsysTax + s_subsysSales + s_subsysProd + s_subsysPlan).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		jQuery('.total-result').text(s_calcTotal + " ₽");

	}); //end #calcTotal click


	//clicking +/-
	jQuery('.calc-incr').on('click', function () {
		var calcQuantField = jQuery(this).parent().find('.calc-quant');
		var calcQuant = parseInt(calcQuantField.val());
		if (!isNaN(calcQuant)) {
			calcQuantField.val(calcQuant + 1);
		}
	});
	jQuery('.calc-decr').on('click', function () {
		var calcQuantField = jQuery(this).parent().find('.calc-quant');
		var calcQuant = parseInt(calcQuantField.val());
		if (!isNaN(calcQuant) && calcQuant > 0) {
			calcQuantField.val(calcQuant - 1);
		}

	});

}); //end doc ready
