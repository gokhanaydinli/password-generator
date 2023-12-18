const generatePassword = (length, charset) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password;

};

document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate");
    const passwordInput = document.getElementById("password");
    const passwordStrengthSpan = document.getElementById("passwordStrength");
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const copyButton = document.getElementById("copy");
    const options = document.querySelectorAll(".options input[type='checkbox']");

    const updateLengthValue = () => {
        lengthValue.textContent = lengthSlider.value;
    };

    // Disable the generate password button if not options

    const updateGenerateButtonState = () => {
        generateButton.disabled = ![...options].some((opt) => opt.checked);
    };

    //Update the password strength indicator based on password input
    const updatePasswordStrength = () => {
        const password = passwordInput.value;
        if (password === "") {
            passwordStrengthSpan.textContent = "Password strength wil be displayed here";
            passwordStrengthSpan.className = "";
            return;
        }

        const passwordLength = password.length;
        let strength = "";
        if (passwordLength <= 6) {
            strength = "Weak";
        } else if (passwordLength <= 8) {
            strength = "Average";
        } else if (passwordLength <= 10) {
            strength = "Strong";
        } else {
            strength = "Very Strong";
        }
        passwordStrengthSpan.textContent = `Password Strength: ${strength}`;
        passwordStrengthSpan.className = strength.toLowerCase();
    };

    // generate and display password
    const generateAndDisplayPassword = () => {
        const charset = {
            lowercase: "abcdefghijklmnopqrstuvwxy",
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXY",
            numbers: "0123456789",
            symbols: "!@#$&/()=?_}][{|;:,.<>"
        };
        // update character set based on selected options
        options.forEach((option) => {
            charset[option.id] = option.checked ? charset[option.id] : "";
        });

        // generate password and update ui

        const selectedCharset = Object.values(charset).join("");
        const password = generatePassword(
            Number(lengthSlider.value),
            selectedCharset
        );
        passwordInput.value = password;
        updatePasswordStrength();
        updateGenerateButtonState();
    };

    // add event listeners

    lengthSlider.addEventListener("input", updateLengthValue);
    options.forEach((option) =>
        option.addEventListener("change", updateGenerateButtonState)
    );
    passwordInput.addEventListener("input",updatePasswordStrength);
    generateButton.addEventListener("click",generateAndDisplayPassword);
    copyButton.addEventListener("click",()=>{
        const copyText = document.getElementById("password");
        copyText.select();
        copyText.setSelectionRange(0,9999);

        navigator.clipboard.writeText(copyText.value);

        const element = document.getElementById("tooltip");
        element.classList.add("show");
        setTimeout(()=>{
            element.classList.remove("show");
        },2000)
    });

    updateGenerateButtonState();
    updateLengthValue();
    updatePasswordStrength()
})