const feedbackForm = document.querySelector('form.feedback-form');
const localStorageKey = 'feedback-form-state';

const populateFieldsFromLocalStorage = () => {
  const storedObject = localStorage.getItem(localStorageKey);
  if (storedObject === null) {
    return;
  }
  const parsedStoredObject = JSON.parse(storedObject);
  feedbackForm.elements.email.value = parsedStoredObject.email;
  feedbackForm.elements.message.value = parsedStoredObject.message;
};
populateFieldsFromLocalStorage();

const getInputValues = () => {
  const email = feedbackForm.elements.email.value.trim();
  const message = feedbackForm.elements.message.value.trim();
  return { email, message };
};

function handleInput(event) {
  const values = getInputValues();

  localStorage.setItem(localStorageKey, JSON.stringify(values));
}

function handleSubmit(event) {
  event.preventDefault();
  const values = getInputValues();

  if (values.email === '' || values.message === '') {
    return alert('All form fields must be filled in');
  }

  const parsedStoredObject = JSON.parse(localStorage.getItem(localStorageKey));
  console.log(parsedStoredObject);

  localStorage.removeItem(localStorageKey);

  feedbackForm.reset();
}

feedbackForm.addEventListener('input', handleInput);
feedbackForm.addEventListener('submit', handleSubmit);
