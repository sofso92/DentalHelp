
function validate(e)
{
    hideAllErrors();
    
    if(formHasErrors())
    {
        e.preventDefault();
        return false;
    }

    return true;
}

function resetForm(e){
    if ( confirm('Do you want to Clear the form?') )
    {
        hideAllErrors();
        
        document.getElementById("fname").focus();
        
        return true;
    }

    e.preventDefault();
    
    return false;
}

function showError(formField, errorFlag)
{   
    if ( !errorFlag )
    {
       /* , errorId document.getElementById(errorId).style.display = "block";

        formField.focus();*/
        
        if ( formField.type == "text" && formField.type == "email" && formField.type == "tel" )
        {
            formField.select();
        }		
    }
}

function formHasErrors(){

    let errorFlag = false;
	let requiredFields = ["fname","email","phonenum"];

	for(let i=0;i<requiredFields.length;i++)
	{
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i]).style.visibility = "visible";

			if(!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}

	let regex = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);
	let emailValue = document.getElementById("email").value;

	if(!regex.test(emailValue))
	{
		document.getElementById("email_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("email_error").style.visibility = "visible";
	}

	let secondRegex = new RegExp(/^[a-zA-Z]+$/g);
	let fullnameValue = document.getElementById("fname").value;

	if(!secondRegex.test(fullnameValue))
	{
		document.getElementById("fname_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("fname").focus();
			document.getElementById("fname").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("fname_error").style.visibility = "visible";
	}
	
	let thirdRegex = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
	let phoneNumValue = document.getElementById("phonenum").value;

	if(!thirdRegex.test(phoneNumValue))
	{
		document.getElementById("phonenum_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("phonenum").focus();
			document.getElementById("phonenum").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("phone_error").style.visibility = "hidden";
	}

    let options = ["yes","no","scared","uh"];
    let optionChecked = false;

    for(let i=0;i<options.length && !optionChecked;i++)
    {
        if(document.getElementById(options[i]).checked)
        {
            optionChecked = true;
        }
    }
    if(!optionChecked)
    {
        document.getElementById("dental_error").style.display = "block";
        errorFlag = true;
    }
    
    return errorFlag;
}

function hideAllErrors()
{
    let errorFields = document.getElementsByClassName("error");
    for(let i=0;i<errorFields.length;i++)
    {
        errorFields[i].style.display = "none";
    }
}

function trim(str){
    // Uses a regex to remove spaces from a string.
    return str.replace(/^\s+|\s+$/g,"");
}


function formFieldHasInput(fieldElement){
    // Check if the text field has a value
    if ( fieldElement.value == null || trim(fieldElement.value) == "" )
    {
        // Invalid entry
        return false;
    }
    
    // Valid entry
    return true;
}

/*
 * Handles the load event of the document.
 */
function load(){
    // Add event listener for the form submit
    document.getElementById("survey_form").addEventListener("submit", validate);

    document.getElementById("survey_form").reset();

    document.getElementById("survey_form").addEventListener("reset", resetForm);
}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);
