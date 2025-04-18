document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Message sent successfully!');
});

function addTodo() {
  const input = document.getElementById('todoInput');
  const task = input.value.trim();

  if (task === '') {
    alert('Please enter a task.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = task;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '❌';
  removeBtn.onclick = () => li.remove();

  li.appendChild(removeBtn);
  document.getElementById('todoList').appendChild(li);
  input.value = '';
}
