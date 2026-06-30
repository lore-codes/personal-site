let otherGenderRadioButton = document.getElementById("other-gender");
let otherGenderTextField = document.getElementById("othergendertext");

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", () => {
        otherGenderTextField.hidden = !otherGenderRadioButton.checked;
    });
});