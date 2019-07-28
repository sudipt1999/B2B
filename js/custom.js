$(document).ready(function(){

    const apiKey = '534bc03726fc0dad9e3ba713e5d31563-us3';
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $("#request-demo-btn").click(function(e){
        e.preventDefault();
        console.log("CLICKED")
        const name = $('#name').val();
        const company = $('#company').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const reps = $('#sales-rep').children("option:selected").val();

        // <div class="invalid-feedback">
        //   Please choose a username.
        // </div>
        let valid = true;
        if(name.length < 3){
            console.log("invlaid name", name.length)
            valid = false;
            $('#name-input .invalid-feedback').remove();
            $('#name-input').append(`<div class="invalid-feedback d-block lead">Too Short !</div>`)
        }else {
            $('#name-input .invalid-feedback').remove();
        }

        if(company.length < 4){
            console.log("invalid company name")
            valid = false;
            $('#company-input .invalid-feedback').remove();
            $('#company-input').append(`<div class="invalid-feedback d-block lead">Too Short Company Name !</div>`)
        }else {
            $('#company-input .invalid-feedback').remove();
        }

        if(! isEmail(email.toString())) {
            console.log("invalid email")
            valid = false;
            $('#email-input .invalid-feedback').remove();
            $('#email-input').append(`<div class="invalid-feedback d-block lead">Not a valid Email !</div>`)
        }else{
            $('#email-input .invalid-feedback').remove();
        }

        if(phone.length < 10) {
            console.log("invalid phone number");
            valid = false;
            $('#phone-input .invalid-feedback').remove();
            $('#phone-input').append(`<div class="invalid-feedback d-block lead">Not a valid phone number !</div>`)
        }else{
            $('#phone-input .invalid-feedback').remove();
        }

        if(reps == 'Choose...') {
            console.log("invalid value");
            valid = false;
            $('#sales-input .invalid-feedback').remove();
            $('#sales-input').append(`<div class="invalid-feedback d-block lead">Not a valid option !</div>`)
        }else {
            $('#sales-input .invalid-feedback').remove();
        }


        if(!valid)
        {
            console.log("invalid form inputs")
            return;
        }



        const data = {
            'name' : name,
            'email': email,
            'phone': phone,
            'company': company,
            'reps': reps
        }
        console.log(data);
        sendEmail(data)
    });

    function sendEmail(t) {
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "sudiptdabral2991999@gmail.com",
            Password : "18a68d71-e1a9-4b29-a063-79026f2d3e25",
            To : 'sudiptdabral2991999@gmail.com',
            From : "sudiptdabral2991999@gmail.com",
            Subject : "REQUEST DEMO",
            Body : `Name : ${t.name} phone: ${t.phone} email: ${t.email} company: ${t.company} reps: ${t.reps}`
        }).then(message =>{
          $('#request-input-form').append(`
            <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
            <h2>Thank You !</h2>
            <p class="lead">
            A EMS specialist will be in touch with you soon !
            </p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
          `)

        $('#name').val("");
        $('#company').val("");
        $('#email').val("");
        $('#phone').val("");
        $('#sales-rep').val("Choose...");
        });
    }
    
  });