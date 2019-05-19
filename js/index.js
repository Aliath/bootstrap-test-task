function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const verifyState = { name: false, surname: false, age: false, address: false, mail: false };
const verificators = {
  name: e => e.length >= 3 && e.length < 256,
  surname: e => e.length >= 3 && e.length < 256,
  age: e => e >= 12 && e <= 100,
  address: e => e.length >= 3 && e.length < 256,
  mail: validateEmail,
};

for (let age = 12; age < 100; age ++) {
  $('#form-age').append(`<option value="${age}">${age}</option>`);
}


// remove class pretending placeholder
$('#form-age').on('change', function() {
  $(this).removeClass('form__select--init');
});

Object.entries(verifyState).forEach(e => {
  const fieldName = e[0];


  $(`#form-${fieldName}`).on('change', function() {
    $(this).parent().removeClass('form-group--verified');
    verifyState[fieldName] = false;


    if (verificators[fieldName]($(this).val())) {
      $(this).parent().addClass('form-group--verified');
      verifyState[fieldName] = true;
    }
  });
});


$('#submit').on('click', function(event) {
  event.preventDefault();
  if (Object.values(verifyState).filter(e => !e).length !== 0) return $('#balert').show().text('Nie uzupełniłeś poprawnie wszystkich pól!');

  fetch('./database.php?' + $('form').serialize()).then(() => {
    $('#balert').hide();
    $('#galert').show().text('Wysłano pomyślnie!');
    $('form input[type!="submit"], form select').val('')
  });
});
