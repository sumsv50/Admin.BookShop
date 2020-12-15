const username = document.getElementById('username');
const txtPassword = document.getElementById('password');
const txtPassword2 = document.getElementById('password2');

//Form validation
username.addEventListener('change', ()=>{
    if(username.value.length < 6) username.classList.add('is-invalid');
    else username.classList.remove('is-invalid');
})

txtPassword.addEventListener('input', ()=>{
    if(txtPassword.value.length < 6) txtPassword.classList.add('is-invalid');
    else
    {
        txtPassword.classList.remove('is-invalid');
        if(txtPassword2.value.length>0 && txtPassword.value != txtPassword2.value)
            txtPassword2.classList.add('is-invalid');
        else txtPassword2.classList.remove('is-invalid');
    }
})

txtPassword2.addEventListener('input', ()=>{
    if(txtPassword2.value.length>0 && txtPassword.value != txtPassword2.value) txtPassword2.classList.add('is-invalid');
    else txtPassword2.classList.remove('is-invalid');
})
