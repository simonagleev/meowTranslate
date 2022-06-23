const fromTextarea = document.querySelector('#from-textarea');
const toTextarea = document.querySelector('#to-textarea');
const sapBtn = document.querySelector('.swap-button');
const translateBtn = document.querySelector('.translate-button');

const test = document.querySelector('.test');



console.log(test)


const butt = document.querySelector('#butt')

translateBtn.addEventListener('click', function() {
  
    const fromValue = test.value 
    console.log('test')
    console.log(fromValue)
})
let val = document.getElementById('elem1').value;
butt.addEventListener('click', function() {

    

    document.getElementById('str').innerHTML="Вы ввели: " + val;
}
)
