import xin from 'xin';

import 'xin/components/repeat';
import './css/xin-rating.css';

const DEFAULT_IMG = String(`
  <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stop-color="#ffcf53"/>
        <stop offset="50%" stop-color="#cccccc" stop-opacity="1" />
      </linearGradient>
    </defs>
    <path class="star" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/>
  </svg>
`);

class XinRating extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      value: {
        type: String,
        notify: true,
        observer: 'valueChanged(value)',
      },

      max: {
        type: Number,
        value: 5,
      },

      size: {
        type: Number,
        value: 50,
      },

      readonly: {
        type: Boolean,
      },
    });
  }

  get listeners () {
    return Object.assign({}, super.listeners, {
      'click .rating': 'ratingClicked(evt)',
    });
  }

  attached () {
    super.attached();

    for (let i = 0; i < this.max; i++) {
      let el = document.createElement('div');
      el.classList.add('rating');
      el.style.height = el.style.width = `${this.size}px`;
      el.index = i;
      el.innerHTML = DEFAULT_IMG;
      // el.querySelector('svg').setAttribute('width', `${this.size}px`);
      this.appendChild(el);
    }
  }

  ratingClicked (evt) {
    if (this.readonly) {
      return;
    }

    let target = evt.target;
    while (target && !target.matches('.rating')) {
      target = target.parentElement;
    }

    this.set('value', target.index + 1);
  }

  valueChanged (value) {
    value = parseFloat(value, 10);

    this.querySelectorAll('.rating').forEach((el, index) => {
      el.classList.remove('full');
      el.classList.remove('half');
      if (index < value) {
        if (index + 1 < value) {
          el.classList.add('full');
        } else {
          el.classList.add(index + 1 === value ? 'full' : 'half');
        }
      }
    });
  }
}

xin.define('xin-rating', XinRating);

export default XinRating;
