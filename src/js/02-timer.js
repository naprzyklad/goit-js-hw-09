import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      window.alert('Please choose a date in the future');
      return;
    }
    document.querySelector('[data-start]').disabled = false;
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const endDate = new Date(document.getElementById('datetime-picker').value);
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = endDate - currentTime;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      return;
    }
    const timeParts = convertMs(remainingTime);
    document.querySelector('[data-days]').textContent = addLeadingZero(
      timeParts.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      timeParts.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      timeParts.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      timeParts.seconds
    );
  }, 1000);
});
