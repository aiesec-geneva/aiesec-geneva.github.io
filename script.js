const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const dialog = document.querySelector('#department-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeButton = dialog.querySelector('.dialog-close');
let lastTrigger = null;

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.department-card').forEach((card) => {
  card.addEventListener('click', () => {
    const template = document.querySelector(`#department-${card.dataset.department}`);
    if (!template) return;
    lastTrigger = card;
    dialogContent.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    document.body.classList.add('dialog-open');
    closeButton.focus();
  });
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogContent.replaceChildren();
  lastTrigger?.focus();
});
