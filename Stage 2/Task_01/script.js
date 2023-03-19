const form = document.querySelector('.comment_form');
const nameInput = form.querySelector('#name');
const commentInput = form.querySelector('#comment');
const dateInput = form.querySelector('#date');
const commentsContainer = document.querySelector('.comments_container');

const handleSubmit = (event) => {
  event.preventDefault();

  let isValid = true;
  if (!nameInput.value.trim()) {
    isValid = false;
    nameInput.nextElementSibling.textContent = 'Введите имя';
  }
  if (!commentInput.value.trim()) {
    isValid = false;
    commentInput.nextElementSibling.textContent = 'Введите комментарий';
  }
  const dateTime = getValidDateTimeOrFalse(dateInput.value);
  if (!dateTime && dateInput.value != "") {
    isValid = false;
    dateInput.nextElementSibling.textContent = 'Введите дату в формате ДД.ММ.ГГГГ ЧЧ:ММ'
  }

  if (isValid) {
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const date = dateInput.value ? processDateTime(dateTime) : processDateTime(new Date());

    const newComment = createComment(name, comment, date);

    commentsContainer.appendChild(newComment);
    newComment.addEventListener('click', handleButtonComment);
    form.reset();
  }
};

const handleNameChange = () => {
  if (!nameInput.value.trim()) {
    nameInput.nextElementSibling.textContent = 'Введите имя';
  } else {
    nameInput.nextElementSibling.textContent = '';
  }
};

const handleCommentChange = () => {
  if (!commentInput.value.trim()) {
    commentInput.nextElementSibling.textContent = 'Введите комментарий';
  } else {
    commentInput.nextElementSibling.textContent = '';
  }
};

const handleButtonComment = (event) => {
  const button = event.target.closest('.comment_button');
  if(!button) return;
  if(button.getAttribute("id") === "like_button") {
    button.classList.toggle("active_like_button");
  }
  if(button.getAttribute("id") === "delete_button") {
    button.closest(".comment").remove()
  }
}

const createComment = (name, comment, date) => {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');

  const commentHeader = document.createElement('div');
  commentHeader.classList.add('comment_header');

  const nameElement = document.createElement('h3');
  nameElement.classList.add('comment_name');
  nameElement.textContent = name;

  const dateElement = document.createElement('span');
  dateElement.classList.add('comment_date');
  dateElement.textContent = date;

  commentHeader.append(nameElement);
  commentHeader.append(dateElement);

  const commentBody = document.createElement('div');
  commentBody.classList.add('comment_body');
  commentBody.textContent = comment;

  const commentButtons = document.createElement('div');
  commentButtons.classList.add('comment_buttons');

  const commentLikeButton = '<i class="comment_button fa fa-heart" aria-hidden="true" id="like_button"></i>';

  const commentDeleteButton = '<i class="comment_button fa fa-trash" aria-hidden="true" id="delete_button"></i>';

  commentButtons.innerHTML +=commentDeleteButton;
  commentButtons.innerHTML +=commentLikeButton;

  commentElement.append(commentHeader);
  commentElement.append(commentBody);
  commentElement.append(commentButtons);

  return commentElement;
};

const getValidDateTimeOrFalse = (dateTimeString) => {
  const regex = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})\s([0-9]{2}):([0-9]{2})$/;
  
  if (!regex.test(dateTimeString)) {
    return false;
  }

  const dateTimeParts = dateTimeString.split(" ");
  const dateParts = dateTimeParts[0].split(".");
  const timeParts = dateTimeParts[1].split(":");
  
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[0], 10);
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  
  const date = new Date(year, month, day, hours, minutes);
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day ||
      date.getHours() !== hours || date.getMinutes() !== minutes) {
    return false;
  }

  return date;
}

const processDateTime = (date) => {
  
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).setHours(0, 0, 0, 0) - 86400000;
    const commentDate = new Date(date);
    
    if (commentDate.getTime() >= today) {
      return `сегодня, ${commentDate.toLocaleTimeString().slice(0,5)}`;
    } else if (commentDate.getTime() >= yesterday) {
      return `вчера, ${commentDate.toLocaleTimeString().slice(0,5)}`;
    } else {
      return commentDate.toLocaleDateString() + " " + commentDate.toLocaleTimeString().slice(0,5);
    }
  
  
}

form.addEventListener('submit', handleSubmit);
nameInput.addEventListener('input', handleNameChange);
commentInput.addEventListener('input', handleCommentChange);
