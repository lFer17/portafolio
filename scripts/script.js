let cards = document.querySelectorAll('.card');
let container = document.querySelector('#proyectos');

//     method for insert proyects dinamically

// let div = document.createElement("h2");
// let texto = document.createTextNode("Culito de rubia culito que clavo");

// div.appendChild(texto);
// container.appendChild(div);


class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}


const phrases = [
  'HTML',
  'CSS',
  'JAVASCRIPT',
  'BOOTSTRAP',
  'REACT',
  'MY SQL'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()

//                                                         form controls 



let send = document.querySelector('.send');

send.addEventListener('click',(event) =>{
 let status="";
  event.preventDefault();
  console.log("click")
  let tempParams = {
    from_name: document.getElementById("from_name").value, 
    to_name: document.getElementById("to_name").value, 
    message: document.getElementById("msg").value 
  };
  emailjs.send('service_iypjq1q','template_m8defut',tempParams,"user_nsW0qjQ7kCGBIQ8jvvh33")
  .then(res => console.log("succes",res.status))
  
})


//                                          Cards animations 

const observer = new IntersectionObserver(entry => {
  
  cards.forEach( card => {
    card.classList.toggle('show',entry.isIntersecting);
  })

},{
  rootMargin:'-100px'
})

observer.observe(container);