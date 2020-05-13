console.log('Loaded events.js');
const odsHandler = (e) => console.log(`ods ${e.type}: ${e.target.id} ${e.target.checked}`     );
const checkboxHandler = (e) => console.log(`chx ${e.type}: ${e.target.id} ${e.target.checked}`     );
const radioHandler = (e) => console.log(`rdo ${e.type}: ${e.target.id} ${e.target.checked}`     );

const odsCheckboxes = document.querySelectorAll('ods-inputoption');
odsCheckboxes.forEach(ods => ods.addEventListener('toggleEvent', odsHandler));
odsCheckboxes.forEach(ods => ods.addEventListener('change', odsHandler));
odsCheckboxes.forEach(ods => ods.addEventListener('input', odsHandler));

const defaultCheckboxes = document.querySelectorAll('input[type="checkbox"]');
defaultCheckboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxHandler));
defaultCheckboxes.forEach(checkbox => checkbox.addEventListener('input', checkboxHandler));

const defaultradio = document.querySelectorAll('input[type="radio"]');
defaultradio.forEach(radio => radio.addEventListener('change', radioHandler));
defaultradio.forEach(radio => radio.addEventListener('input', radioHandler));